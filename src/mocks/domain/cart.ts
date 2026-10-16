import type { Cart, CartItem, CartNotice, PriceSummary } from '@/contracts/cart'
import type { Network } from '@/contracts/common'
import { eth, multiplyEth, percentOf, sumEth, toEthAmount } from '@/lib/money'

import { COUPON_FIXTURES } from '../fixtures/users'
import { db, mutate } from '../db/store'
import { NETWORK_FEES, type CartRecord, type CouponRecord, type NftRecord } from '../db/types'

export type CartKey = `user:${string}` | `guest:${string}`

const emptyCart = (): CartRecord => ({
  items: [],
  couponCode: null,
  updatedAt: new Date().toISOString(),
})

export function getCartRecord(key: CartKey): CartRecord {
  return db().carts[key] ?? emptyCart()
}

export function maxQuantityFor(nft: NftRecord, editionId: string) {
  const edition = nft.editions.find((item) => item.id === editionId)
  return edition ? Math.min(edition.available, nft.maxPerOrder) : 0
}

export function findCoupon(code: string | null): {
  coupon: CouponRecord | null
  status: 'ok' | 'invalido' | 'expirado'
} {
  if (!code) return { coupon: null, status: 'invalido' }
  const coupon = COUPON_FIXTURES[code.trim().toUpperCase()]
  if (!coupon) return { coupon: null, status: 'invalido' }
  if (Date.parse(coupon.expiresAt) <= Date.now()) return { coupon, status: 'expirado' }
  return { coupon, status: 'ok' }
}

/**
 * Ajusta o carrinho à disponibilidade atual: quantidade acima do máximo é reduzida e o item
 * recebe aviso; edição esgotada fica marcada como indisponível (e fora dos totais).
 */
export function reconcileCart(key: CartKey) {
  const record = db().carts[key]
  if (!record) return
  mutate((draft) => {
    const cart = draft.carts[key]!
    for (const item of cart.items) {
      const nft = draft.nfts[item.nftId]
      const max = nft ? maxQuantityFor(nft, item.editionId) : 0
      if (max === 0) addNotice(item.notices, 'indisponivel')
      else if (item.quantity > max) {
        item.quantity = max
        addNotice(item.notices, 'quantidade-ajustada')
      }
    }
  })
}

function addNotice(notices: CartNotice[], notice: CartNotice) {
  if (!notices.includes(notice)) notices.push(notice)
}

export function buildCart(key: CartKey, network: Network = 'ethereum'): Cart {
  reconcileCart(key)
  const record = getCartRecord(key)
  const nfts = db().nfts
  const items: CartItem[] = record.items.flatMap((item) => {
    const nft = nfts[item.nftId]
    const edition = nft?.editions.find((candidate) => candidate.id === item.editionId)
    if (!nft || !edition) return []
    const priceChanged = eth(nft.price).cmp(item.seenPrice) !== 0
    const notices = [...item.notices]
    if (priceChanged) addNotice(notices, 'preco-alterado')
    return [
      {
        id: `${item.nftId}:${item.editionId}`,
        nftId: nft.id,
        editionId: edition.id,
        editionLabel: edition.label,
        name: nft.name,
        tokenId: nft.tokenId,
        image: nft.image,
        network: nft.network,
        quantity: item.quantity,
        unitPrice: nft.price,
        lineTotal: toEthAmount(multiplyEth(nft.price, item.quantity)),
        previousUnitPrice: priceChanged ? item.seenPrice : null,
        available: edition.available,
        maxQuantity: maxQuantityFor(nft, edition.id),
        notices,
      },
    ]
  })
  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    summary: summarize(
      items.filter((item) => !item.notices.includes('indisponivel')).map((item) => item.lineTotal),
      record.couponCode,
      network,
    ),
    updatedAt: record.updatedAt,
  }
}

/** Subtotal, desconto do cupom, taxa da rede e total, com aritmética decimal. */
export function summarize(
  lineTotals: string[],
  couponCode: string | null,
  network: Network,
): PriceSummary {
  const subtotal = sumEth(lineTotals)
  const { coupon, status } = findCoupon(couponCode)
  const discount = coupon && status === 'ok' ? percentOf(subtotal, coupon.percent) : eth(0)
  const networkFee = subtotal.gt(0) ? eth(NETWORK_FEES[network]) : eth(0)
  return {
    subtotal: toEthAmount(subtotal),
    discount: toEthAmount(discount),
    networkFee: toEthAmount(networkFee),
    total: toEthAmount(subtotal.minus(discount).plus(networkFee)),
    coupon:
      coupon && status === 'ok' ? { code: coupon.code, description: coupon.description } : null,
    network,
  }
}

export function writeCart(key: CartKey, change: (cart: CartRecord) => void) {
  mutate((draft) => {
    const cart = (draft.carts[key] ??= emptyCart())
    change(cart)
    cart.updatedAt = new Date().toISOString()
  })
}

/** O usuário viu os avisos: o preço atual passa a ser a referência e os avisos são limpos. */
export function acknowledgeNotices(key: CartKey) {
  writeCart(key, (cart) => {
    for (const item of cart.items) {
      const nft = db().nfts[item.nftId]
      if (nft) item.seenPrice = nft.price
      item.notices = []
    }
  })
}

/**
 * Junta o carrinho de visitante ao do usuário ao autenticar: soma quantidades, limitando cada
 * item à disponibilidade; o cupom do usuário prevalece. O carrinho de visitante é descartado.
 */
export function mergeGuestCart(guestId: string, userKey: CartKey) {
  const guestKey: CartKey = `guest:${guestId}`
  const guest = db().carts[guestKey]
  const adjusted: { itemId: string; requested: number; kept: number }[] = []
  if (!guest) return adjusted
  writeCart(userKey, (cart) => {
    for (const guestItem of guest.items) {
      const nft = db().nfts[guestItem.nftId]
      if (!nft) continue
      const max = maxQuantityFor(nft, guestItem.editionId)
      const existing = cart.items.find(
        (item) => item.nftId === guestItem.nftId && item.editionId === guestItem.editionId,
      )
      const requested = (existing?.quantity ?? 0) + guestItem.quantity
      const kept = Math.min(requested, max)
      if (kept < requested)
        adjusted.push({ itemId: `${guestItem.nftId}:${guestItem.editionId}`, requested, kept })
      if (kept === 0) continue
      if (existing) existing.quantity = kept
      else cart.items.push({ ...guestItem, quantity: kept, notices: [] })
    }
    cart.couponCode ??= guest.couponCode
  })
  mutate((draft) => {
    delete draft.carts[guestKey]
  })
  return adjusted
}

/** Após a confirmação do pedido, remove só os itens e as quantidades comprados. */
export function removePurchased(
  key: CartKey,
  lines: { nftId: string; editionId: string; quantity: number }[],
) {
  writeCart(key, (cart) => {
    for (const line of lines) {
      const item = cart.items.find(
        (candidate) => candidate.nftId === line.nftId && candidate.editionId === line.editionId,
      )
      if (item) item.quantity -= line.quantity
    }
    cart.items = cart.items.filter((item) => item.quantity > 0)
    if (cart.items.length === 0) cart.couponCode = null
  })
}

import type { Network } from '@/contracts/common'
import type { OrderCreate, QuoteChange } from '@/contracts/order'
import { eth } from '@/lib/money'

import { db, mutate, nextId } from '../db/store'
import type { OrderRecord, QuoteRecord, UserRecord } from '../db/types'
import { getScenario } from '../scenarios/active'

import { buildCart, findCoupon, maxQuantityFor, removePurchased, type CartKey } from './cart'
import { updateNft } from './catalog'
import { publishOrderUpdated } from './events'

const QUOTE_TTL_MS = 5 * 60 * 1000

export type DomainResult<T> =
  | { ok: true; value: T }
  | { ok: false; status: number; code: string; message: string; details?: unknown }

/** POST /api/quotes — congela o carrinho atual com preços, cupom e taxa da rede escolhida. */
export function createQuote(user: UserRecord, network: Network): DomainResult<QuoteRecord> {
  const key: CartKey = `user:${user.id}`
  const cart = buildCart(key, network)
  if (cart.items.length === 0) {
    return { ok: false, status: 422, code: 'VALIDATION', message: 'Seu carrinho está vazio.' }
  }
  const unavailable = cart.items.filter((item) => item.notices.includes('indisponivel'))
  if (unavailable.length) {
    return {
      ok: false,
      status: 409,
      code: 'AVAILABILITY_CONFLICT',
      message: 'Há itens esgotados no carrinho. Remova-os para continuar.',
      details: { itemIds: unavailable.map((item) => item.id) },
    }
  }
  const now = Date.now()
  const quote: QuoteRecord = {
    id: nextId('qte'),
    userId: user.id,
    couponCode: db().carts[key]?.couponCode ?? null,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + QUOTE_TTL_MS).toISOString(),
    lines: cart.items.map((item) => ({
      nftId: item.nftId,
      editionId: item.editionId,
      editionLabel: item.editionLabel,
      name: item.name,
      tokenId: item.tokenId,
      image: item.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal,
      nftVersion: db().nfts[item.nftId]!.version,
    })),
    ...cart.summary,
  }
  mutate((draft) => {
    draft.quotes[quote.id] = quote
  })
  return { ok: true, value: quote }
}

/** Compara a cotação com o catálogo atual: preço, disponibilidade e validade do cupom. */
export function quoteChanges(quote: QuoteRecord): QuoteChange[] {
  const changes: QuoteChange[] = []
  for (const line of quote.lines) {
    const nft = db().nfts[line.nftId]
    if (!nft) continue
    if (eth(nft.price).cmp(line.unitPrice) !== 0) {
      changes.push({
        nftId: line.nftId,
        editionId: line.editionId,
        name: line.name,
        kind: 'preco',
        before: line.unitPrice,
        after: nft.price,
      })
    }
    const max = maxQuantityFor(nft, line.editionId)
    if (line.quantity > max) {
      changes.push({
        nftId: line.nftId,
        editionId: line.editionId,
        name: line.name,
        kind: 'disponibilidade',
        before: String(line.quantity),
        after: String(max),
      })
    }
  }
  if (quote.couponCode && findCoupon(quote.couponCode).status !== 'ok') {
    changes.push({
      nftId: '',
      editionId: '',
      name: quote.couponCode,
      kind: 'cupom',
      before: 'válido',
      after: 'inválido',
    })
  }
  return changes
}

/** Serialização com chaves ordenadas em todos os níveis: o mesmo conteúdo gera o mesmo texto. */
function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(',')}}`
  }
  return JSON.stringify(value)
}

/** Hash estável (FNV-1a) do corpo, para comparar tentativas com a mesma chave de idempotência. */
export function hashBody(body: unknown) {
  const text = canonicalJson(body)
  let hash = 0x811c9dc5
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16)
}

type CreateOrderResult = DomainResult<{ order: OrderRecord; replayed: boolean }>

/**
 * POST /api/orders. A mesma chave com o mesmo corpo recupera o pedido já criado (inclusive depois
 * de um timeout); a mesma chave com outro corpo é conflito.
 */
export function createOrder(
  user: UserRecord,
  idempotencyKey: string,
  body: OrderCreate,
): CreateOrderResult {
  const bodyHash = hashBody(body)
  const existing = db().idempotency[`${user.id}:${idempotencyKey}`]
  if (existing) {
    if (existing.bodyHash !== bodyHash) {
      return {
        ok: false,
        status: 409,
        code: 'IDEMPOTENCY_CONFLICT',
        message: 'Esta chave de idempotência já foi usada com outro pedido.',
      }
    }
    return { ok: true, value: { order: db().orders[existing.orderId]!, replayed: true } }
  }

  const quote = db().quotes[body.quoteId]
  if (!quote || quote.userId !== user.id) {
    return { ok: false, status: 404, code: 'NOT_FOUND', message: 'Cotação não encontrada.' }
  }
  if (Date.parse(quote.expiresAt) <= Date.now()) {
    return {
      ok: false,
      status: 409,
      code: 'QUOTE_EXPIRED',
      message: 'A cotação expirou. Revise os valores e confirme de novo.',
    }
  }
  const changes = quoteChanges(quote)
  if (changes.length) {
    return {
      ok: false,
      status: 409,
      code: 'QUOTE_STALE',
      message: 'Preços ou disponibilidade mudaram desde a cotação.',
      details: { changes },
    }
  }
  const wallet = (db().wallets[user.id] ?? []).find((item) => item.id === body.walletId)
  if (!wallet) {
    return {
      ok: false,
      status: 422,
      code: 'VALIDATION',
      message: 'Selecione uma carteira cadastrada.',
    }
  }

  const scenario = getScenario()
  const now = new Date().toISOString()
  const {
    userId: _userId,
    couponCode: _couponCode,
    id: _quoteId,
    expiresAt: _expiresAt,
    createdAt: _createdAt,
    ...snapshot
  } = quote
  const order: OrderRecord = {
    ...structuredClone(snapshot),
    id: nextId('ord'),
    userId: user.id,
    status: 'pendente',
    version: 1,
    createdAt: now,
    updatedAt: now,
    wallet: {
      id: wallet.id,
      nickname: wallet.nickname,
      address: wallet.address,
      provider: body.provider,
    },
    transaction: null,
    failureReason: null,
    settleAt: new Date(Date.now() + scenario.settleDelayMs).toISOString(),
    outcome: scenario.orderOutcome,
  }
  mutate((draft) => {
    draft.orders[order.id] = order
    draft.idempotency[`${user.id}:${idempotencyKey}`] = { orderId: order.id, bodyHash }
  })
  scheduleSettlement(order.id)
  return { ok: true, value: { order, replayed: false } }
}

const timers = new Map<string, ReturnType<typeof setTimeout>>()

function scheduleSettlement(orderId: string) {
  const order = db().orders[orderId]
  if (!order || order.status !== 'pendente' || timers.has(orderId)) return
  const wait = Math.max(0, Date.parse(order.settleAt) - Date.now())
  timers.set(
    orderId,
    setTimeout(() => settle(orderId), wait),
  )
}

/** Retoma a simulação dos pedidos pendentes depois de um refresh. */
export function resumePendingSettlements() {
  for (const order of Object.values(db().orders)) scheduleSettlement(order.id)
}

/** Encerra o pagamento simulado. Estados confirmado e recusado são terminais. */
function settle(orderId: string) {
  timers.delete(orderId)
  const order = db().orders[orderId]
  if (!order || order.status !== 'pendente') return

  let outcome = order.outcome
  let failureReason: string | null =
    outcome === 'recusado' ? 'Pagamento recusado pela carteira (simulação).' : null
  if (outcome === 'confirmado') {
    const soldOut = order.lines.find((line) => {
      const nft = db().nfts[line.nftId]
      return !nft || maxQuantityFor(nft, line.editionId) < line.quantity
    })
    if (soldOut) {
      outcome = 'recusado'
      failureReason = `${soldOut.name} esgotou antes da confirmação.`
    }
  }

  if (outcome === 'confirmado') {
    for (const line of order.lines) {
      const nft = db().nfts[line.nftId]!
      const edition = nft.editions.find((item) => item.id === line.editionId)!
      updateNft(nft.id, { editions: { [edition.id]: edition.available - line.quantity } })
    }
    removePurchased(`user:${order.userId}`, order.lines)
  }

  const updated = mutate((draft) => {
    const target = draft.orders[orderId]!
    target.status = outcome
    target.version += 1
    target.updatedAt = new Date().toISOString()
    target.failureReason = failureReason
    if (outcome === 'confirmado') {
      const hash = transactionHash(orderId)
      target.transaction = {
        hash,
        explorerUrl: explorerUrl(target.network, hash),
        confirmedAt: target.updatedAt,
      }
    }
    return target
  })
  publishOrderUpdated(updated)
}

/** Hash de transação simulado e determinístico (64 dígitos hexadecimais). */
function transactionHash(orderId: string) {
  let hex = ''
  for (let round = 0; hex.length < 64; round++) hex += hashBody({ orderId, round }).padStart(8, '0')
  return `0x${hex.slice(0, 64)}`
}

function explorerUrl(network: Network, hash: string) {
  const base = {
    ethereum: 'https://etherscan.io/tx/',
    polygon: 'https://polygonscan.com/tx/',
    solana: 'https://solscan.io/tx/',
  }
  return `${base[network]}${hash}`
}

export function ordersOf(userId: string) {
  return Object.values(db().orders)
    .filter((order) => order.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** Remove os campos internos antes de responder. */
export function toOrder(order: OrderRecord) {
  const { userId: _userId, settleAt: _settleAt, outcome: _outcome, ...publicOrder } = order
  return publicOrder
}

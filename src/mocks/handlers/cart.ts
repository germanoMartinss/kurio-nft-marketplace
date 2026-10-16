import { HttpResponse } from 'msw'

import {
  cartItemAddSchema,
  cartItemUpdateSchema,
  cartMergeSchema,
  couponApplySchema,
  type Cart,
  type CartMergeResult,
} from '@/contracts/cart'
import { networkSchema } from '@/contracts/common'
import { eth, toEthAmount } from '@/lib/money'

import { db } from '../db/store'
import { requireUser, resolveSession } from '../domain/auth'
import {
  acknowledgeNotices,
  buildCart,
  findCoupon,
  getCartRecord,
  maxQuantityFor,
  mergeGuestCart,
  writeCart,
  type CartKey,
} from '../domain/cart'
import { findNft, updateNft } from '../domain/catalog'
import { getScenario } from '../scenarios/active'

import { apiError, parseBody, route } from './http'

const GUEST_ID = /^[a-zA-Z0-9-]{8,64}$/

/**
 * O carrinho pertence ao usuário autenticado ou, sem sessão, ao visitante identificado pelo header
 * X-Guest-Id (gerado e guardado pelo cliente). Assim o carrinho do visitante também vive na API.
 */
function cartKeyFor(request: Request): { key: CartKey } | { response: Response } {
  const session = resolveSession(request)
  if (session.kind === 'error') return { response: session.response }
  if (session.kind === 'ok') return { key: `user:${session.user.id}` }
  const guestId = request.headers.get('x-guest-id')
  if (!guestId || !GUEST_ID.test(guestId)) {
    return {
      response: apiError(422, 'VALIDATION', 'Identificador de visitante ausente ou inválido.'),
    }
  }
  return { key: `guest:${guestId}` }
}

const networkOf = (request: Request) =>
  networkSchema.safeParse(new URL(request.url).searchParams.get('network')).data ?? 'ethereum'

const cartResponse = (key: CartKey, request: Request, status = 200) =>
  HttpResponse.json<Cart>(buildCart(key, networkOf(request)), { status })

/**
 * Cenários "preço alterado" e "edição esgotada": alguns segundos depois de o carrinho ser
 * consultado com itens, o primeiro item muda no catálogo e o servidor publica `nft.updated`.
 */
const triggeredChanges = new Set<string>()
function scheduleScenarioChange(key: CartKey) {
  const change = getScenario().cartChange
  const first = getCartRecord(key).items[0]
  const triggerKey = `${getScenario().id}:${key}`
  if (!change || !first || triggeredChanges.has(triggerKey)) return
  triggeredChanges.add(triggerKey)
  setTimeout(() => {
    const nft = db().nfts[first.nftId]
    if (!nft) return
    if (change.kind === 'preco') {
      updateNft(nft.id, {
        price: toEthAmount(eth(nft.price).times('1.15').round(2)),
        previousPrice: null,
      })
    } else {
      updateNft(nft.id, { editions: { [first.editionId]: 0 } })
    }
  }, change.afterMs)
}

export const cartHandlers = [
  route('get', '/cart', ({ request }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    scheduleScenarioChange(scope.key)
    return cartResponse(scope.key, request)
  }),

  route('post', '/cart/items', async ({ request }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    const parsed = await parseBody(request, cartItemAddSchema)
    if ('response' in parsed) return parsed.response
    const { nftId, editionId, quantity } = parsed.data
    const nft = findNft(nftId)
    const edition = nft?.editions.find((item) => item.id === editionId)
    if (!nft || !edition) return apiError(404, 'NOT_FOUND', 'NFT ou edição não encontrados.')
    const existing = getCartRecord(scope.key).items.find(
      (item) => item.nftId === nftId && item.editionId === editionId,
    )
    const max = maxQuantityFor(nft, editionId)
    const requested = (existing?.quantity ?? 0) + quantity
    if (max === 0)
      return apiError(409, 'AVAILABILITY_CONFLICT', `A edição ${edition.label} está esgotada.`, {
        details: { maxQuantity: 0 },
      })
    if (requested > max) {
      return apiError(
        409,
        'AVAILABILITY_CONFLICT',
        `Você pode ter no máximo ${max} unidade(s) desta edição no carrinho.`,
        {
          details: { maxQuantity: max },
        },
      )
    }
    writeCart(scope.key, (cart) => {
      const item = cart.items.find(
        (candidate) => candidate.nftId === nftId && candidate.editionId === editionId,
      )
      if (item) item.quantity = requested
      else cart.items.push({ nftId, editionId, quantity, seenPrice: nft.price, notices: [] })
    })
    return cartResponse(scope.key, request, existing ? 200 : 201)
  }),

  route<{ itemId: string }>('patch', '/cart/items/:itemId', async ({ request, params }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    const parsed = await parseBody(request, cartItemUpdateSchema)
    if ('response' in parsed) return parsed.response
    const [nftId, editionId] = params.itemId.split(':')
    const item = getCartRecord(scope.key).items.find(
      (candidate) => candidate.nftId === nftId && candidate.editionId === editionId,
    )
    const nft = nftId ? findNft(nftId) : undefined
    if (!item || !nft || !editionId) return apiError(404, 'NOT_FOUND', 'Item não está no carrinho.')
    const max = maxQuantityFor(nft, editionId)
    if (parsed.data.quantity > max) {
      return apiError(409, 'AVAILABILITY_CONFLICT', `Disponível: no máximo ${max} unidade(s).`, {
        details: { maxQuantity: max },
      })
    }
    writeCart(scope.key, (cart) => {
      const target = cart.items.find(
        (candidate) => candidate.nftId === nftId && candidate.editionId === editionId,
      )!
      target.quantity = parsed.data.quantity
      target.notices = target.notices.filter((notice) => notice !== 'quantidade-ajustada')
    })
    return cartResponse(scope.key, request)
  }),

  route<{ itemId: string }>('delete', '/cart/items/:itemId', ({ request, params }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    const [nftId, editionId] = params.itemId.split(':')
    if (
      !getCartRecord(scope.key).items.some(
        (item) => item.nftId === nftId && item.editionId === editionId,
      )
    ) {
      return apiError(404, 'NOT_FOUND', 'Item não está no carrinho.')
    }
    writeCart(scope.key, (cart) => {
      cart.items = cart.items.filter(
        (item) => !(item.nftId === nftId && item.editionId === editionId),
      )
      if (cart.items.length === 0) cart.couponCode = null
    })
    return cartResponse(scope.key, request)
  }),

  route('put', '/cart/coupon', async ({ request }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    const parsed = await parseBody(request, couponApplySchema)
    if ('response' in parsed) return parsed.response
    const { coupon, status } = findCoupon(parsed.data.code)
    if (status === 'invalido') {
      return apiError(422, 'COUPON_INVALID', 'Código promocional inválido.', {
        fieldErrors: { code: 'Código promocional inválido.' },
      })
    }
    if (status === 'expirado') {
      return apiError(422, 'COUPON_EXPIRED', 'Este código promocional expirou.', {
        fieldErrors: { code: 'Este código promocional expirou.' },
      })
    }
    writeCart(scope.key, (cart) => {
      cart.couponCode = coupon!.code
    })
    return cartResponse(scope.key, request)
  }),

  route('delete', '/cart/coupon', ({ request }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    writeCart(scope.key, (cart) => {
      cart.couponCode = null
    })
    return cartResponse(scope.key, request)
  }),

  route('post', '/cart/notices/ack', ({ request }) => {
    const scope = cartKeyFor(request)
    if ('response' in scope) return scope.response
    acknowledgeNotices(scope.key)
    return cartResponse(scope.key, request)
  }),

  route('post', '/cart/merge', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const parsed = await parseBody(request, cartMergeSchema)
    if ('response' in parsed) return parsed.response
    const key: CartKey = `user:${auth.user.id}`
    const adjusted = mergeGuestCart(parsed.data.guestId, key)
    return HttpResponse.json<CartMergeResult>({
      cart: buildCart(key, networkOf(request)),
      adjusted,
    })
  }),
]

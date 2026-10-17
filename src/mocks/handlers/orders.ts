import { delay, HttpResponse } from 'msw'

import type { ApiErrorCode } from '@/contracts/common'
import { orderCreateSchema, quoteRequestSchema, type Order, type Quote } from '@/contracts/order'

import { db } from '../db/store'
import { requireUser } from '../domain/auth'
import { createOrder, createQuote, ordersOf, toOrder, type DomainResult } from '../domain/orders'
import { getScenario, nextCount } from '../scenarios/active'

import { apiError, parseBody, route } from './http'

function failure(result: Extract<DomainResult<unknown>, { ok: false }>) {
  return apiError(result.status, result.code as ApiErrorCode, result.message, {
    details: result.details,
  })
}

export const orderHandlers = [
  route('post', '/quotes', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const parsed = await parseBody(request, quoteRequestSchema)
    if ('response' in parsed) return parsed.response
    const result = createQuote(auth.user, parsed.data.network)
    if (!result.ok) return failure(result)
    const { userId: _userId, couponCode: _couponCode, ...quote } = result.value
    return HttpResponse.json<Quote>(quote, { status: 201 })
  }),

  route('post', '/orders', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const key = request.headers.get('idempotency-key')
    if (!key || key.length < 8) {
      return apiError(422, 'VALIDATION', 'O header Idempotency-Key é obrigatório.')
    }
    const parsed = await parseBody(request, orderCreateSchema)
    if ('response' in parsed) return parsed.response
    const latency = getScenario().orderLatencyMs
    if (latency) await delay(latency)
    const result = createOrder(auth.user, key, parsed.data)
    if (!result.ok) return failure(result)

    // Cenário "timeout ao criar pedido": o pedido já existe, mas a primeira resposta para esta
    // chave chega depois do timeout do cliente. O reenvio com a mesma chave o recupera.
    const responseDelay = getScenario().orderResponseDelayMs
    if (responseDelay && !result.value.replayed && nextCount(`pedido:${key}`) === 1) {
      await delay(responseDelay)
    }
    return HttpResponse.json<Order>(toOrder(result.value.order), {
      status: result.value.replayed ? 200 : 201,
      headers: result.value.replayed ? { 'Idempotent-Replayed': 'true' } : undefined,
    })
  }),

  route('get', '/orders', ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const status = new URL(request.url).searchParams.get('status')
    const items = ordersOf(auth.user.id)
      .filter((order) => !status || order.status === status)
      .map(toOrder)
    return HttpResponse.json({ items })
  }),

  route<{ id: string }>('get', '/orders/:id', ({ request, params }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const order = db().orders[params.id]
    // Pedido de outro usuário responde como inexistente, para não revelar que ele existe.
    if (!order || order.userId !== auth.user.id)
      return apiError(404, 'NOT_FOUND', 'Pedido não encontrado.')
    return HttpResponse.json<Order>(toOrder(order))
  }),
]

import { orderSchema, quoteSchema, type OrderCreate, type QuoteRequest } from '@/contracts/order'

import { http } from './http'
import { parseResponse } from './parse'

export async function createQuote(body: QuoteRequest) {
  const { data } = await http.post<unknown>('/quotes', body)
  return parseResponse(quoteSchema, data)
}

/** A mesma chave de idempotência deve ser reusada em todas as tentativas do mesmo pedido. */
export async function createOrder(body: OrderCreate, idempotencyKey: string) {
  const { data } = await http.post<unknown>('/orders', body, {
    headers: { 'Idempotency-Key': idempotencyKey },
  })
  return parseResponse(orderSchema, data)
}

export async function getOrder(id: string, signal?: AbortSignal) {
  const { data } = await http.get<unknown>(`/orders/${encodeURIComponent(id)}`, { signal })
  return parseResponse(orderSchema, data)
}

import {
  cartMergeResultSchema,
  cartSchema,
  type CartItemAdd,
  type CouponApply,
} from '@/contracts/cart'
import type { Network } from '@/contracts/common'

import { http } from './http'
import { parseResponse } from './parse'

const parseCart = (data: unknown) => parseResponse(cartSchema, data)

export async function getCart(network: Network = 'ethereum', signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/cart', { params: { network }, signal })
  return parseCart(data)
}

export async function addCartItem(body: CartItemAdd) {
  const { data } = await http.post<unknown>('/cart/items', body)
  return parseCart(data)
}

export async function updateCartItem(itemId: string, quantity: number) {
  const { data } = await http.patch<unknown>(`/cart/items/${encodeURIComponent(itemId)}`, {
    quantity,
  })
  return parseCart(data)
}

export async function removeCartItem(itemId: string) {
  const { data } = await http.delete<unknown>(`/cart/items/${encodeURIComponent(itemId)}`)
  return parseCart(data)
}

export async function applyCoupon(body: CouponApply) {
  const { data } = await http.put<unknown>('/cart/coupon', body)
  return parseCart(data)
}

export async function removeCoupon() {
  const { data } = await http.delete<unknown>('/cart/coupon')
  return parseCart(data)
}

export async function acknowledgeCartNotices() {
  const { data } = await http.post<unknown>('/cart/notices/ack')
  return parseCart(data)
}

export async function mergeGuestCart(guestId: string) {
  const { data } = await http.post<unknown>('/cart/merge', { guestId })
  return parseResponse(cartMergeResultSchema, data)
}

import * as z from 'zod/mini'

import { ethAmountSchema, isoDateTimeSchema, networkSchema } from './common'
import { nftImageSchema } from './nft'

/** Avisos de um item do carrinho, mantidos até o usuário reconhecê-los. */
export const cartNoticeSchema = z.enum(['preco-alterado', 'quantidade-ajustada', 'indisponivel'])
export type CartNotice = z.infer<typeof cartNoticeSchema>

export const cartItemSchema = z.object({
  /** `${nftId}:${editionId}` */
  id: z.string(),
  nftId: z.string(),
  editionId: z.string(),
  editionLabel: z.string(),
  name: z.string(),
  tokenId: z.string(),
  image: nftImageSchema,
  network: networkSchema,
  quantity: z.int().check(z.positive()),
  unitPrice: ethAmountSchema,
  lineTotal: ethAmountSchema,
  /** Preço que o usuário viu antes da última alteração, quando houver aviso de preço. */
  previousUnitPrice: z.nullable(ethAmountSchema),
  available: z.int().check(z.nonnegative()),
  /** Máximo permitido para este item: menor entre a disponibilidade e o limite por pedido. */
  maxQuantity: z.int().check(z.nonnegative()),
  notices: z.array(cartNoticeSchema),
})
export type CartItem = z.infer<typeof cartItemSchema>

export const couponSchema = z.object({ code: z.string(), description: z.string() })
export type Coupon = z.infer<typeof couponSchema>

/** Valores calculados pela API; o cliente apenas exibe. */
export const priceSummarySchema = z.object({
  subtotal: ethAmountSchema,
  discount: ethAmountSchema,
  networkFee: ethAmountSchema,
  total: ethAmountSchema,
  coupon: z.nullable(couponSchema),
  network: networkSchema,
})
export type PriceSummary = z.infer<typeof priceSummarySchema>

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  /** Soma das quantidades (badge do carrinho). */
  itemCount: z.int(),
  summary: priceSummarySchema,
  updatedAt: isoDateTimeSchema,
})
export type Cart = z.infer<typeof cartSchema>

/** POST /api/cart/items — soma à quantidade existente do mesmo NFT e edição. */
export const cartItemAddSchema = z.object({
  nftId: z.string(),
  editionId: z.string(),
  quantity: z.int().check(z.positive()),
})
export type CartItemAdd = z.infer<typeof cartItemAddSchema>

/** PATCH /api/cart/items/:itemId */
export const cartItemUpdateSchema = z.object({ quantity: z.int().check(z.positive()) })
export type CartItemUpdate = z.infer<typeof cartItemUpdateSchema>

/** PUT /api/cart/coupon */
export const couponApplySchema = z.object({
  code: z.string().check(z.trim(), z.minLength(1, 'Informe o código promocional.')),
})
export type CouponApply = z.infer<typeof couponApplySchema>

/** POST /api/cart/merge — itens do carrinho de visitante transferidos ao autenticar. */
export const cartMergeSchema = z.object({ guestId: z.string() })
export const cartMergeResultSchema = z.object({
  cart: cartSchema,
  /** Itens cuja quantidade foi limitada pela disponibilidade durante a junção. */
  adjusted: z.array(z.object({ itemId: z.string(), requested: z.int(), kept: z.int() })),
})
export type CartMergeResult = z.infer<typeof cartMergeResultSchema>

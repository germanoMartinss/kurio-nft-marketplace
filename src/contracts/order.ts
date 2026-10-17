import * as z from 'zod/mini'

import { emailSchema, usernameSchema } from './auth'
import { couponSchema } from './cart'
import { ethAmountSchema, isoDateTimeSchema, networkSchema } from './common'
import { nftImageSchema } from './nft'
import { ensNameSchema } from './profile'
import { walletProviderSchema } from './wallet'

export const quoteLineSchema = z.object({
  nftId: z.string(),
  editionId: z.string(),
  editionLabel: z.string(),
  name: z.string(),
  tokenId: z.string(),
  image: nftImageSchema,
  quantity: z.int().check(z.positive()),
  unitPrice: ethAmountSchema,
  lineTotal: ethAmountSchema,
  /** Versão do NFT no momento da cotação; o pedido é recusado se o catálogo mudou desde então. */
  nftVersion: z.int(),
})

/** POST /api/quotes — congela preços, disponibilidade, cupom e taxa do carrinho atual. */
export const quoteRequestSchema = z.object({ network: networkSchema })
export type QuoteRequest = z.infer<typeof quoteRequestSchema>

export const quoteSchema = z.object({
  id: z.string(),
  createdAt: isoDateTimeSchema,
  expiresAt: isoDateTimeSchema,
  network: networkSchema,
  lines: z.array(quoteLineSchema),
  subtotal: ethAmountSchema,
  discount: ethAmountSchema,
  networkFee: ethAmountSchema,
  total: ethAmountSchema,
  coupon: z.nullable(couponSchema),
})
export type Quote = z.infer<typeof quoteSchema>

/** Detalhe do erro 409 QUOTE_STALE: o que mudou desde a cotação. */
export const quoteChangeSchema = z.object({
  nftId: z.string(),
  editionId: z.string(),
  name: z.string(),
  kind: z.enum(['preco', 'disponibilidade', 'cupom']),
  before: z.string(),
  after: z.string(),
})
export type QuoteChange = z.infer<typeof quoteChangeSchema>

export const buyerSchema = z.object({
  displayName: z.string().check(z.trim(), z.minLength(1, 'Informe o nome de exibição.')),
  username: usernameSchema,
  profileName: z.string().check(z.trim(), z.minLength(1, 'Informe o nome do perfil.')),
  email: emailSchema,
  ensName: ensNameSchema.check(z.minLength(3, 'Informe o nome ENS.')),
  referralCode: z
    .string()
    .check(z.trim(), z.regex(/^[A-Z0-9]{4,12}$/, 'Use de 4 a 12 letras maiúsculas ou números.')),
  note: z.string().check(z.maxLength(280, 'Use no máximo 280 caracteres.')),
})
export type Buyer = z.infer<typeof buyerSchema>

/** POST /api/orders — exige o header Idempotency-Key. */
export const orderCreateSchema = z.object({
  quoteId: z.string(),
  walletId: z.string(),
  provider: walletProviderSchema,
  buyer: buyerSchema,
})
export type OrderCreate = z.infer<typeof orderCreateSchema>

export const orderStatusSchema = z.enum(['pendente', 'confirmado', 'recusado'])
export type OrderStatus = z.infer<typeof orderStatusSchema>

/** Pedido com o snapshot da cotação: alterações posteriores no catálogo não mudam o recibo. */
export const orderSchema = z.object({
  id: z.string(),
  status: orderStatusSchema,
  version: z.int(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
  network: networkSchema,
  lines: z.array(quoteLineSchema),
  subtotal: ethAmountSchema,
  discount: ethAmountSchema,
  networkFee: ethAmountSchema,
  total: ethAmountSchema,
  coupon: z.nullable(couponSchema),
  wallet: z.object({
    id: z.string(),
    nickname: z.string(),
    address: z.string(),
    provider: walletProviderSchema,
  }),
  /** Transação simulada; presente apenas em pedidos confirmados. */
  transaction: z.nullable(
    z.object({ hash: z.string(), explorerUrl: z.string(), confirmedAt: isoDateTimeSchema }),
  ),
  failureReason: z.nullable(z.string()),
})
export type Order = z.infer<typeof orderSchema>

export const orderListSchema = z.object({ items: z.array(orderSchema) })

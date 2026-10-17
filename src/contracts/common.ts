import * as z from 'zod/mini'

/**
 * Valor em ETH trafegado como string decimal (nunca number), para não perder precisão.
 * Ex.: "1.19", "26.846", "0.016". Até 18 casas, como o wei.
 */
export const ethAmountSchema = z
  .string()
  .check(z.regex(/^\d+(\.\d{1,18})?$/, 'Valor em ETH inválido'))
export type EthAmount = z.infer<typeof ethAmountSchema>

export const isoDateTimeSchema = z.iso.datetime({ offset: true })

export const networkSchema = z.enum(['ethereum', 'polygon', 'solana'])
export type Network = z.infer<typeof networkSchema>

export const NETWORK_LABELS: Record<Network, string> = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  solana: 'Solana',
}

/**
 * Códigos de erro da API. O HTTP status acompanha a categoria (422 validação, 401 sessão,
 * 403 permissão, 404 inexistente, 409 conflito, 503 falha transitória).
 */
export const apiErrorCodeSchema = z.enum([
  'VALIDATION',
  'UNAUTHENTICATED',
  'SESSION_EXPIRED',
  'INVALID_CREDENTIALS',
  'FORBIDDEN',
  'NOT_FOUND',
  'EMAIL_TAKEN',
  'USERNAME_TAKEN',
  'AVAILABILITY_CONFLICT',
  'COUPON_INVALID',
  'COUPON_EXPIRED',
  'QUOTE_EXPIRED',
  'QUOTE_STALE',
  'IDEMPOTENCY_CONFLICT',
  'WALLET_REJECTED',
  'NETWORK_MISMATCH',
  'TRANSIENT',
])
export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>

export const apiErrorSchema = z.object({
  error: z.object({
    code: apiErrorCodeSchema,
    message: z.string(),
    /** Erros por campo, para associar a mensagem ao input correspondente. */
    fieldErrors: z.optional(z.record(z.string(), z.string())),
    /** Dados adicionais do erro (ex.: itens alterados numa cotação desatualizada). */
    details: z.optional(z.unknown()),
  }),
})
export type ApiError = z.infer<typeof apiErrorSchema>['error']

export function pageSchema<T extends z.ZodMiniType>(item: T) {
  return z.object({
    items: z.array(item),
    page: z.int(),
    pageSize: z.int(),
    total: z.int(),
    totalPages: z.int(),
  })
}

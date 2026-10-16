import { z } from 'zod'

/** GET /api/health — verificação de disponibilidade da API. */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  serverTime: z.iso.datetime(),
})
export type HealthResponse = z.infer<typeof healthResponseSchema>

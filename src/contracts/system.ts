import * as z from 'zod/mini'

import { emailSchema } from './auth'
import { isoDateTimeSchema } from './common'

/** GET /api/health — verificação de disponibilidade da API. */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  serverTime: isoDateTimeSchema,
  scenario: z.string(),
})
export type HealthResponse = z.infer<typeof healthResponseSchema>

/** POST /api/newsletter — idempotente: inscrever o mesmo e-mail de novo não é erro. */
export const newsletterRequestSchema = z.object({ email: emailSchema })
export type NewsletterRequest = z.infer<typeof newsletterRequestSchema>
export const newsletterResponseSchema = z.object({
  email: z.string(),
  alreadySubscribed: z.boolean(),
})
export type NewsletterResponse = z.infer<typeof newsletterResponseSchema>

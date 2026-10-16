import * as z from 'zod/mini'

const emptyToUndefined = (value: unknown) => (value === '' ? undefined : value)

const envSchema = z.object({
  VITE_ENABLE_MOCKS: z.pipe(
    z._default(z.enum(['true', 'false']), 'true'),
    z.transform((value) => value === 'true'),
  ),
  VITE_API_BASE_URL: z._default(z.string().check(z.minLength(1)), '/api'),
  VITE_SOCKET_URL: z.pipe(z.transform(emptyToUndefined), z.optional(z.url())),
})

const parsed = envSchema.parse(import.meta.env)

/** Configuração da aplicação, validada na inicialização. Ver `.env.example`. */
export const env = {
  enableMocks: parsed.VITE_ENABLE_MOCKS,
  apiBaseUrl: parsed.VITE_API_BASE_URL,
  /** Origem HTTP(S) do servidor Socket.IO; por padrão, a própria origem da aplicação. */
  socketOrigin: parsed.VITE_SOCKET_URL ?? window.location.origin,
  isProduction: import.meta.env.PROD,
} as const

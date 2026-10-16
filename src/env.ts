import { z } from 'zod'

const emptyToUndefined = (value: unknown) => (value === '' ? undefined : value)

const envSchema = z.object({
  VITE_ENABLE_MOCKS: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  VITE_API_BASE_URL: z.string().min(1).default('/api'),
  VITE_SOCKET_URL: z.preprocess(emptyToUndefined, z.url().optional()),
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

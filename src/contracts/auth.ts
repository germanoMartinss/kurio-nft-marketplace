import * as z from 'zod/mini'

import { isoDateTimeSchema } from './common'

const trimmed = () => z.string().check(z.trim())

/** Regras compartilhadas entre o formulário e a API simulada. */
export const usernameSchema = trimmed().check(
  z.minLength(3, 'Use pelo menos 3 caracteres.'),
  z.maxLength(24, 'Use no máximo 24 caracteres.'),
  z.regex(/^[a-z0-9_.]+$/, 'Use apenas letras minúsculas, números, ponto e sublinhado.'),
)
export const emailSchema = trimmed().check(z.email('Informe um e-mail válido.'))
export const passwordSchema = z
  .string()
  .check(
    z.minLength(8, 'A senha precisa ter pelo menos 8 caracteres.'),
    z.regex(/[a-zA-Z]/, 'A senha precisa ter pelo menos uma letra.'),
    z.regex(/\d/, 'A senha precisa ter pelo menos um número.'),
  )

export const sessionUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  displayName: z.string(),
  avatarUrl: z.nullable(z.string()),
})
export type SessionUser = z.infer<typeof sessionUserSchema>

/** Resposta de login e cadastro. O token é opaco e vai no header Authorization (Bearer). */
export const authSessionSchema = z.object({
  token: z.string(),
  expiresAt: isoDateTimeSchema,
  user: sessionUserSchema,
})
export type AuthSession = z.infer<typeof authSessionSchema>

/** GET /api/auth/session */
export const currentSessionSchema = z.object({
  expiresAt: isoDateTimeSchema,
  user: sessionUserSchema,
})
export type CurrentSession = z.infer<typeof currentSessionSchema>

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().check(z.minLength(1, 'Informe a senha.')),
})
export type LoginRequest = z.infer<typeof loginRequestSchema>

export const registerRequestSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
})
export type RegisterRequest = z.infer<typeof registerRequestSchema>

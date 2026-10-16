import * as z from 'zod/mini'

import { emailSchema, passwordSchema, usernameSchema } from './auth'

export const ensNameSchema = z
  .string()
  .check(
    z.trim(),
    z.regex(/^$|^[a-z0-9-]{3,32}$/, 'Use de 3 a 32 letras minúsculas, números ou hífen.'),
  )

export const profileSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  username: z.string(),
  email: z.string(),
  /** Nome ENS sem o sufixo ".eth"; vazio quando não informado. */
  ensName: z.string(),
  walletNickname: z.string(),
  avatarUrl: z.nullable(z.string()),
})
export type Profile = z.infer<typeof profileSchema>

const requiredText = (label: string) =>
  z
    .string()
    .check(
      z.trim(),
      z.minLength(1, `Informe ${label}.`),
      z.maxLength(40, 'Use no máximo 40 caracteres.'),
    )

/** PATCH /api/profile */
export const profileUpdateSchema = z.object({
  displayName: requiredText('o nome de exibição'),
  username: usernameSchema,
  email: emailSchema,
  ensName: ensNameSchema,
  walletNickname: requiredText('o apelido da carteira'),
})
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>

export const AVATAR_MAX_BYTES = 1_000_000
export const AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const

/** PUT /api/profile/avatar — imagem como data URL (a API simulada guarda localmente). */
export const avatarUpdateSchema = z.object({
  dataUrl: z
    .string()
    .check(z.regex(/^data:image\/(png|jpeg|webp);base64,/, 'Envie uma imagem PNG, JPEG ou WebP.')),
})
export type AvatarUpdate = z.infer<typeof avatarUpdateSchema>

/** POST /api/profile/password */
export const passwordChangeSchema = z.object({
  currentPassword: z.string().check(z.minLength(1, 'Informe a senha atual.')),
  newPassword: passwordSchema,
})
export type PasswordChange = z.infer<typeof passwordChangeSchema>

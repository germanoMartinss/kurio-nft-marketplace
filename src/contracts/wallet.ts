import * as z from 'zod/mini'

import { emailSchema } from './auth'
import { networkSchema } from './common'
import { ensNameSchema } from './profile'

export const walletKindSchema = z.enum(['principal', 'secundaria'])
export type WalletKind = z.infer<typeof walletKindSchema>

export const walletProviderSchema = z.enum(['metamask', 'walletconnect', 'coinbase'])
export type WalletProvider = z.infer<typeof walletProviderSchema>

export const WALLET_PROVIDER_LABELS: Record<WalletProvider, string> = {
  metamask: 'MetaMask',
  walletconnect: 'WalletConnect',
  coinbase: 'Coinbase Wallet',
}

export const walletAddressSchema = z
  .string()
  .check(
    z.trim(),
    z.regex(/^0x[a-fA-F0-9]{40}$/, 'Informe um endereço 0x com 40 caracteres hexadecimais.'),
  )

const requiredText = (label: string) =>
  z
    .string()
    .check(
      z.trim(),
      z.minLength(1, `Informe ${label}.`),
      z.maxLength(40, 'Use no máximo 40 caracteres.'),
    )

/** Campos do formulário "Carteiras" do Figma. */
export const walletInputSchema = z.object({
  displayName: requiredText('o nome de exibição'),
  nickname: requiredText('o apelido da carteira'),
  profileName: requiredText('o nome do perfil'),
  network: networkSchema,
  address: walletAddressSchema,
  /** ENS ou endereço de carteira secundária (opcional). */
  secondaryAddress: z.string().check(z.trim(), z.maxLength(64, 'Use no máximo 64 caracteres.')),
  provider: walletProviderSchema,
  referralCode: z
    .string()
    .check(z.trim(), z.regex(/^[A-Z0-9]{4,12}$/, 'Use de 4 a 12 letras maiúsculas ou números.')),
  email: emailSchema,
  ensName: ensNameSchema,
})
export type WalletInput = z.infer<typeof walletInputSchema>

export const walletSchema = z.extend(walletInputSchema, {
  id: z.string(),
  kind: walletKindSchema,
})
export type Wallet = z.infer<typeof walletSchema>

/** Carteira na listagem: inclui o estado da conexão simulada, guardado na API. */
export const walletWithStatusSchema = z.extend(walletSchema, { connected: z.boolean() })
export type WalletWithStatus = z.infer<typeof walletWithStatusSchema>

export const walletListSchema = z.object({ items: z.array(walletWithStatusSchema) })

/** POST /api/wallets */
export const walletCreateSchema = z.extend(walletInputSchema, { kind: walletKindSchema })
export type WalletCreate = z.infer<typeof walletCreateSchema>

/** POST /api/wallets/:id/connect — simulação da conexão com a extensão da carteira. */
export const walletConnectionSchema = z.object({
  walletId: z.string(),
  status: z.enum(['conectada', 'desconectada']),
})
export type WalletConnection = z.infer<typeof walletConnectionSchema>

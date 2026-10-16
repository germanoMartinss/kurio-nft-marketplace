import type { Wallet } from '@/contracts/wallet'

import type { CouponRecord, UserRecord } from '../db/types'

/**
 * Usuários de demonstração. As senhas (documentadas no README) não aparecem aqui: só o sal e o
 * hash PBKDF2-SHA256 (100 mil iterações), calculados fora da aplicação.
 *
 * - ana@kurio.dev / Kurio@2026 — com carteiras principal e secundária e favoritos.
 * - bruno@kurio.dev / Colecao#77 — sem carteiras, para exercitar o cadastro.
 */
export const USER_FIXTURES: UserRecord[] = [
  {
    id: 'usr_ana',
    displayName: 'Ana Lima',
    username: 'analima',
    email: 'ana@kurio.dev',
    ensName: 'ana',
    walletNickname: 'Principal',
    avatarUrl: null,
    passwordSalt: 'kurio-salt-ana-7f3a',
    passwordHash: 'c281ba5ce4021993a5c9843f9f0b6b8a1b1506e6f27fde9a3d28c5ac87e40511',
  },
  {
    id: 'usr_bruno',
    displayName: 'Bruno Sato',
    username: 'brunosato',
    email: 'bruno@kurio.dev',
    ensName: '',
    walletNickname: 'Carteira do Bruno',
    avatarUrl: null,
    passwordSalt: 'kurio-salt-bruno-91c2',
    passwordHash: 'b5f27a03cd32b21faf30df1a55606f934f266824c10d930f1c69cf5d9229babe',
  },
]

export const WALLET_FIXTURES: Record<string, Wallet[]> = {
  usr_ana: [
    {
      id: 'wal_ana_principal',
      kind: 'principal',
      displayName: 'Ana Lima',
      nickname: 'Principal',
      profileName: 'analima',
      network: 'ethereum',
      address: '0xA91F3c5D7e2b4F8a6C1d9E0b3A7f5C2d8E4bE82C',
      secondaryAddress: '',
      provider: 'metamask',
      referralCode: 'KURIO2026',
      email: 'ana@kurio.dev',
      ensName: 'ana',
    },
    {
      id: 'wal_ana_reserva',
      kind: 'secundaria',
      displayName: 'Ana Lima',
      nickname: 'Reserva',
      profileName: 'analima',
      network: 'polygon',
      address: '0x5B2e8D4f1A9c7E3b6D0a2F8c4E1b7D9a3C5f0E21',
      secondaryAddress: 'nova.kurio.eth',
      provider: 'coinbase',
      referralCode: 'KURIO2026',
      email: 'ana@kurio.dev',
      ensName: 'nova',
    },
  ],
  usr_bruno: [],
}

export const FAVORITE_FIXTURES: Record<string, string[]> = {
  usr_ana: ['emerald-ape-042', 'golden-beat-207'],
  usr_bruno: ['neon-vessel-552'],
}

/** Cupons: KURIO10 válido (10%); GENESIS10 expirado. Qualquer outro código é inválido. */
export const COUPON_FIXTURES: Record<string, CouponRecord> = {
  KURIO10: {
    code: 'KURIO10',
    description: 'Desconto de lançamento de 10%',
    percent: 10,
    expiresAt: '2030-12-31T23:59:59.000Z',
  },
  GENESIS10: {
    code: 'GENESIS10',
    description: 'Desconto Genesis de 10%',
    percent: 10,
    expiresAt: '2025-01-31T23:59:59.000Z',
  },
}

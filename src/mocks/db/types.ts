import type { Coupon } from '@/contracts/cart'
import type { CartNotice } from '@/contracts/cart'
import type { Network } from '@/contracts/common'
import type { NftDetail } from '@/contracts/nft'
import type { Order, Quote } from '@/contracts/order'
import type { Profile } from '@/contracts/profile'
import type { Wallet } from '@/contracts/wallet'

/** Estado completo do backend simulado. Persistido no localStorage para sobreviver a refresh. */
export interface DbState {
  schemaVersion: 1
  /** Contador para ids determinísticos (pedidos, cotações, eventos). */
  sequence: number
  nfts: Record<string, NftRecord>
  users: Record<string, UserRecord>
  sessions: Record<string, SessionRecord>
  favorites: Record<string, string[]>
  /** Chave: `user:<id>` ou `guest:<id>`. */
  carts: Record<string, CartRecord>
  wallets: Record<string, Wallet[]>
  quotes: Record<string, QuoteRecord>
  orders: Record<string, OrderRecord>
  /** Chave: `<userId>:<Idempotency-Key>`. */
  idempotency: Record<string, { orderId: string; bodyHash: string }>
  newsletter: string[]
}

export interface NftRecord extends NftDetail {
  trending: boolean
}

export interface UserRecord extends Profile {
  passwordSalt: string
  /** PBKDF2-SHA256, 100 mil iterações, em hexadecimal. A senha em claro nunca é guardada. */
  passwordHash: string
}

export interface SessionRecord {
  userId: string
  createdAt: string
  expiresAt: string
}

export interface CartItemRecord {
  nftId: string
  editionId: string
  quantity: number
  /** Último preço que o usuário viu para o item; diferença em relação ao atual gera aviso. */
  seenPrice: string
  notices: CartNotice[]
}

export interface CartRecord {
  items: CartItemRecord[]
  couponCode: string | null
  updatedAt: string
}

export interface CouponRecord extends Coupon {
  percent: number
  expiresAt: string
}

export interface QuoteRecord extends Quote {
  userId: string
  couponCode: string | null
}

export interface OrderRecord extends Order {
  userId: string
  /** Quando a simulação de pagamento termina (sobrevive a refresh). */
  settleAt: string
  outcome: 'confirmado' | 'recusado'
}

export const NETWORK_FEES: Record<Network, string> = {
  ethereum: '0.016',
  polygon: '0.002',
  solana: '0.001',
}

import type { Buyer, OrderCreate, Quote } from '@/contracts/order'
import type { WalletProvider } from '@/contracts/wallet'
import { CLIENT_KEYS, readJson, writeJson } from '@/lib/client-storage'
import { hashValue } from '@/lib/hash'

/**
 * Tentativa de pedido: a cotação enviada, o corpo e a `Idempotency-Key`. A chave nasce da cotação
 * e do corpo (`quoteId` + hash), então só muda quando a cotação ou o conteúdo do pedido mudam:
 * clique repetido, nova tentativa após timeout e retomada após refresh reutilizam a mesma chave
 * e, portanto, o mesmo pedido. Fica guardada até o pedido chegar a um estado terminal.
 */
export interface OrderAttempt {
  key: string
  quote: Quote
  body: OrderCreate
  /** Preenchido assim que a API responde; antes disso, reenviar com a mesma chave é seguro. */
  orderId: string | null
  /**
   * Já houve envio com esta chave e o resultado é desconhecido (ex.: timeout). Reenviar com a mesma
   * chave é seguro e a API decide: o carrinho pode já ter sido consumido pelo pedido criado, então
   * divergência com o carrinho e validade da cotação deixam de valer como bloqueio.
   */
  sent: boolean
}

export interface CheckoutDraft {
  form: Partial<Buyer>
  walletId: string | null
  provider: WalletProvider | null
  /** Carteiras com a conexão (simulada) ativa. */
  connectedWalletIds: string[]
  attempt: OrderAttempt | null
}

export const EMPTY_DRAFT: CheckoutDraft = {
  form: {},
  walletId: null,
  provider: null,
  connectedWalletIds: [],
  attempt: null,
}

export function idempotencyKeyFor(body: OrderCreate) {
  return `idem-${body.quoteId}-${hashValue(body)}`
}

export function loadCheckoutDraft(userId: string): CheckoutDraft {
  return { ...EMPTY_DRAFT, ...readJson<Partial<CheckoutDraft>>(CLIENT_KEYS.checkoutDraft(userId)) }
}

export function saveCheckoutDraft(userId: string, draft: CheckoutDraft) {
  writeJson(CLIENT_KEYS.checkoutDraft(userId), draft)
}

export function clearCheckoutDraft(userId: string) {
  writeJson(CLIENT_KEYS.checkoutDraft(userId), null)
}

/** Encerra a tentativa (pedido em estado terminal), mantendo o que o usuário já preencheu. */
export function clearAttempt(userId: string) {
  saveCheckoutDraft(userId, { ...loadCheckoutDraft(userId), attempt: null })
}

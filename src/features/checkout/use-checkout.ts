import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiRequestError } from '@/api/errors'
import { connectWallet, disconnectWallet } from '@/api/wallets'
import { createOrder, createQuote } from '@/api/orders'
import type { Network } from '@/contracts/common'
import type { Buyer, OrderCreate, Quote, QuoteChange } from '@/contracts/order'
import type { Wallet, WalletProvider } from '@/contracts/wallet'
import { orderKeys } from '@/features/orders/queries'

import {
  idempotencyKeyFor,
  loadCheckoutDraft,
  saveCheckoutDraft,
  type CheckoutDraft,
  type OrderAttempt,
} from './draft'

/** Problema que impede de enviar o pedido, com o que o usuário precisa fazer a seguir. */
export type CheckoutProblem =
  | { kind: 'stale'; message: string; changes: QuoteChange[] }
  | { kind: 'expired'; message: string }
  | { kind: 'wallet'; message: string }
  | { kind: 'retry'; message: string }
  | { kind: 'other'; message: string }

function toProblem(error: unknown): CheckoutProblem {
  if (error instanceof ApiRequestError) {
    if (error.code === 'QUOTE_STALE') {
      const changes = (error.details as { changes?: QuoteChange[] } | undefined)?.changes ?? []
      return { kind: 'stale', message: error.message, changes }
    }
    if (error.code === 'QUOTE_EXPIRED') return { kind: 'expired', message: error.message }
    if (error.code === 'WALLET_REJECTED')
      return {
        kind: 'wallet',
        message: 'A conexão com a carteira foi recusada. Tente conectar de novo ou escolha outra.',
      }
    if (error.code === 'TIMEOUT' || error.code === 'NETWORK' || error.isTransient)
      return {
        kind: 'retry',
        message:
          'Não recebemos a resposta do servidor. O pedido pode já ter sido criado: reenviar usa a mesma chave e não gera outro.',
      }
    return { kind: 'other', message: error.message }
  }
  return { kind: 'other', message: 'Não foi possível enviar o pedido. Tente novamente.' }
}

/**
 * Orquestra o checkout de um usuário: rascunho persistido (formulário, carteira, conexão), cotação,
 * revisão e envio idempotente do pedido. A confirmação do pedido nunca é decidida aqui: o envio só
 * leva à tela do pedido, que mostra o estado devolvido pela API e atualizado por `order.updated`.
 */
export function useCheckout(userId: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [draft, setDraftState] = useState<CheckoutDraft>(() => loadCheckoutDraft(userId))
  const draftRef = useRef(draft)
  const [reviewing, setReviewing] = useState(() => Boolean(draft.attempt && !draft.attempt.orderId))
  const [problem, setProblem] = useState<CheckoutProblem | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // Guarda síncrona: dois cliques no mesmo tick passam antes de `submitting` atualizar a tela.
  const inFlight = useRef(false)

  const setDraft = useCallback(
    (change: (previous: CheckoutDraft) => CheckoutDraft) => {
      const next = change(draftRef.current)
      draftRef.current = next
      saveCheckoutDraft(userId, next)
      setDraftState(next)
    },
    [userId],
  )

  // Pedido já criado numa tentativa anterior (refresh no meio do envio): retoma pelo pedido.
  const attempt = draft.attempt
  useEffect(() => {
    if (attempt?.orderId)
      void navigate({ to: '/pedido/$orderId', params: { orderId: attempt.orderId }, replace: true })
  }, [attempt?.orderId, navigate])

  const quote = useMutation({
    mutationFn: createQuote,
    onSuccess: (created) => attemptFor(created),
    onError: (error) => setProblem(toProblem(error)),
  })

  // Preenchido por `prepare`: o corpo depende do formulário validado.
  const pending = useRef<{ buyer: Buyer; walletId: string; provider: WalletProvider } | null>(null)

  function attemptFor(created: Quote) {
    const input = pending.current
    if (!input) return
    const body: OrderCreate = {
      quoteId: created.id,
      walletId: input.walletId,
      provider: input.provider,
      buyer: input.buyer,
    }
    setDraft((previous) => ({
      ...previous,
      attempt: { key: idempotencyKeyFor(body), quote: created, body, orderId: null, sent: false },
    }))
    setProblem(null)
    setReviewing(true)
  }

  /** Cotação nova para o pedido descrito: gera outra tentativa (outra chave de idempotência). */
  const requestQuote = (input: {
    buyer: Buyer
    wallet: Wallet
    network: Network
    provider: WalletProvider
  }) => {
    pending.current = { buyer: input.buyer, walletId: input.wallet.id, provider: input.provider }
    setProblem(null)
    quote.mutate({ network: input.network })
  }

  /** Recota o mesmo pedido (cotação expirada ou divergente), mantendo os dados já confirmados. */
  const requote = () => {
    const current = draftRef.current.attempt
    if (!current) return
    pending.current = {
      buyer: current.body.buyer,
      walletId: current.body.walletId,
      provider: current.body.provider,
    }
    setProblem(null)
    quote.mutate({ network: current.quote.network })
  }

  const closeReview = () => {
    setReviewing(false)
    setProblem(null)
    // Sem pedido criado, a tentativa é descartada: uma nova revisão gera cotação e chave novas.
    setDraft((previous) => ({ ...previous, attempt: null }))
  }

  const submit = async () => {
    const current = draftRef.current.attempt as OrderAttempt | null
    if (!current || inFlight.current) return
    inFlight.current = true
    setSubmitting(true)
    setProblem(null)
    try {
      if (!draftRef.current.connectedWalletIds.includes(current.body.walletId)) {
        try {
          await connectWallet(current.body.walletId)
        } catch (error) {
          setProblem(toProblem(error))
          return
        }
        setDraft((previous) => ({
          ...previous,
          connectedWalletIds: [...previous.connectedWalletIds, current.body.walletId],
        }))
      }
      setDraft((previous) => ({
        ...previous,
        attempt: previous.attempt ? { ...previous.attempt, sent: true } : null,
      }))
      // Mesma chave em toda tentativa deste pedido (clique repetido, retry após timeout, refresh).
      const order = await createOrder(current.body, current.key)
      queryClient.setQueryData(orderKeys.detail(userId, order.id), order)
      setDraft((previous) => ({
        ...previous,
        attempt: previous.attempt ? { ...previous.attempt, orderId: order.id } : null,
      }))
      await navigate({ to: '/pedido/$orderId', params: { orderId: order.id } })
    } catch (error) {
      const failure = toProblem(error)
      // A API rejeitou com uma resposta definitiva: nenhum pedido foi criado com esta chave.
      if (failure.kind !== 'retry')
        setDraft((previous) => ({
          ...previous,
          attempt: previous.attempt ? { ...previous.attempt, sent: false } : null,
        }))
      setProblem(failure)
    } finally {
      inFlight.current = false
      setSubmitting(false)
    }
  }

  const toggleConnection = useMutation({
    mutationFn: async ({ walletId, connect }: { walletId: string; connect: boolean }) => {
      if (connect) await connectWallet(walletId)
      else await disconnectWallet(walletId)
      return { walletId, connect }
    },
    onSuccess: ({ walletId, connect }) =>
      setDraft((previous) => ({
        ...previous,
        connectedWalletIds: connect
          ? [...new Set([...previous.connectedWalletIds, walletId])]
          : previous.connectedWalletIds.filter((id) => id !== walletId),
      })),
  })

  return {
    draft,
    setDraft,
    attempt,
    reviewing,
    problem,
    submitting,
    quotePending: quote.isPending,
    requestQuote,
    requote,
    closeReview,
    submit,
    toggleConnection,
  }
}

export type Checkout = ReturnType<typeof useCheckout>

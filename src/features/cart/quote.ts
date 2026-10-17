import { useMutation } from '@tanstack/react-query'

import { createQuote } from '@/api/orders'
import type { Network } from '@/contracts/common'
import type { Cart } from '@/contracts/cart'
import type { Quote } from '@/contracts/order'
import { compareEth } from '@/lib/money'

/**
 * Cotação (pronta para o checkout, Fase 7): congela preços, cupom e taxa. É uma operação, não um
 * dado em cache: cada chamada gera uma cotação nova, por isso é uma mutation. A cotação da API é a
 * referência para finalizar o pedido.
 */
export function useCreateQuote() {
  return useMutation({ mutationFn: (network: Network) => createQuote({ network }) })
}

export interface QuoteDivergence {
  nftId: string
  editionId: string
  name: string
  kind: 'preco' | 'quantidade' | 'removido' | 'total'
}

/**
 * O que mudou entre a cotação em mãos e o carrinho atual (que reflete `nft.updated`). Lista vazia =
 * a cotação ainda vale; qualquer item exige uma nova confirmação antes de enviar o pedido.
 */
export function quoteDivergences(quote: Quote, cart: Cart): QuoteDivergence[] {
  const changes: QuoteDivergence[] = []
  const live = new Map(cart.items.map((item) => [item.id, item]))
  for (const line of quote.lines) {
    const base = { nftId: line.nftId, editionId: line.editionId, name: line.name }
    const item = live.get(`${line.nftId}:${line.editionId}`)
    if (!item || item.notices.includes('indisponivel')) changes.push({ ...base, kind: 'removido' })
    else if (compareEth(item.unitPrice, line.unitPrice) !== 0)
      changes.push({ ...base, kind: 'preco' })
    else if (item.quantity !== line.quantity) changes.push({ ...base, kind: 'quantidade' })
  }
  if (changes.length === 0 && compareEth(cart.summary.total, quote.total) !== 0) {
    changes.push({ nftId: '', editionId: '', name: 'Resumo do pedido', kind: 'total' })
  }
  return changes
}

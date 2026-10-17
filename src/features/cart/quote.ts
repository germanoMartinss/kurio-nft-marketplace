import type { Cart } from '@/contracts/cart'
import type { Quote } from '@/contracts/order'
import { compareEth, formatEth } from '@/lib/money'

export interface QuoteDivergence {
  nftId: string
  editionId: string
  name: string
  kind: 'preco' | 'quantidade' | 'removido' | 'total'
  before: string
  after: string
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
    if (!item || item.notices.includes('indisponivel'))
      changes.push({ ...base, kind: 'removido', before: String(line.quantity), after: '0' })
    else if (compareEth(item.unitPrice, line.unitPrice) !== 0)
      changes.push({ ...base, kind: 'preco', before: line.unitPrice, after: item.unitPrice })
    else if (item.quantity !== line.quantity)
      changes.push({
        ...base,
        kind: 'quantidade',
        before: String(line.quantity),
        after: String(item.quantity),
      })
  }
  const lineKeys = new Set(quote.lines.map((line) => `${line.nftId}:${line.editionId}`))
  for (const item of cart.items)
    if (!lineKeys.has(item.id))
      changes.push({
        nftId: item.nftId,
        editionId: item.editionId,
        name: item.name,
        kind: 'quantidade',
        before: '0',
        after: String(item.quantity),
      })
  if (
    changes.length === 0 &&
    cart.summary.network === quote.network &&
    compareEth(cart.summary.total, quote.total) !== 0
  ) {
    changes.push({
      nftId: '',
      editionId: '',
      name: 'Total do pedido',
      kind: 'total',
      before: quote.total,
      after: cart.summary.total,
    })
  }
  return changes
}

/** Texto de uma mudança (da cotação local ou do `409 QUOTE_STALE`), para o aviso do checkout. */
export function describeChange(change: {
  name: string
  kind: QuoteDivergence['kind'] | 'disponibilidade' | 'cupom'
  before: string
  after: string
}) {
  switch (change.kind) {
    case 'preco':
      return `${change.name}: o preço mudou de ${formatEth(change.before)} para ${formatEth(change.after)}.`
    case 'total':
      return `O total mudou de ${formatEth(change.before)} para ${formatEth(change.after)}.`
    case 'removido':
      return `${change.name} deixou de estar disponível.`
    case 'cupom':
      return `O cupom ${change.name} não é mais válido.`
    default:
      return `${change.name}: a quantidade disponível mudou de ${change.before} para ${change.after}.`
  }
}

import type { CartItem } from '@/contracts/cart'
import { formatEth } from '@/lib/money'

/** Frases dos avisos de um item; a API mantém os avisos até o usuário confirmar que viu. */
export function noticeMessages(item: CartItem): string[] {
  const messages: string[] = []
  const label = `${item.name} (edição ${item.editionLabel})`
  if (item.notices.includes('preco-alterado') && item.previousUnitPrice) {
    messages.push(
      `${label}: o preço mudou de ${formatEth(item.previousUnitPrice)} para ${formatEth(item.unitPrice)}.`,
    )
  }
  if (item.notices.includes('quantidade-ajustada')) {
    messages.push(
      `${label}: a quantidade foi ajustada para ${item.quantity} pela disponibilidade atual.`,
    )
  }
  if (item.notices.includes('indisponivel')) {
    messages.push(`${label} está esgotado, fica fora do total e precisa ser removido.`)
  }
  return messages
}

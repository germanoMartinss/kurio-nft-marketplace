import type { QueryClient } from '@tanstack/react-query'
import * as z from 'zod/mini'

import { orderUpdatedEventSchema, type OrderUpdatedEvent } from '@/contracts/realtime'
import type { Order } from '@/contracts/order'
import { cartKeys } from '@/features/cart/keys'
import { orderKeys } from '@/features/orders/queries'

const SEEN_LIMIT = 500

/**
 * Aplica `order.updated` ao cache do pedido do usuário da sessão.
 *
 * - Evento de outro usuário (`userId` diferente do da sessão) é descartado, mesmo que o servidor
 *   o tivesse entregue: defesa em profundidade além do envio só para o dono.
 * - Duplicata (`eventId`) e evento antigo (versão ≤ a já conhecida) não mudam nada. Estados
 *   `confirmado` e `recusado` são terminais: nunca voltam a `pendente`.
 * - O evento só traz o estado; o recibo (transação, snapshot) vem do REST, então o pedido é
 *   rebuscado ao receber um estado terminal.
 */
export function createOrderEventApplier(queryClient: QueryClient, getUserId: () => string | null) {
  const seen = new Set<string>()
  const lastVersion = new Map<string, number>()

  return function apply(raw: unknown): 'applied' | 'duplicate' | 'stale' | 'foreign' | 'invalid' {
    const parsed = z.safeParse(orderUpdatedEventSchema, raw)
    if (!parsed.success) return 'invalid'
    const event = parsed.data
    const userId = getUserId()
    if (!userId || event.userId !== userId) return 'foreign'
    if (seen.has(event.eventId)) return 'duplicate'
    seen.add(event.eventId)
    if (seen.size > SEEN_LIMIT) seen.delete(seen.values().next().value!)

    const orderId = event.resource.id
    const key = orderKeys.detail(userId, orderId)
    const cached = queryClient.getQueryData<Order>(key)
    const known = Math.max(lastVersion.get(orderId) ?? 0, cached?.version ?? 0)
    if (event.version <= known) return 'stale'
    lastVersion.set(orderId, event.version)

    patchOrder(queryClient, key, event)
    // A confirmação remove itens do carrinho e baixa a disponibilidade no servidor.
    if (event.payload.status === 'confirmado') {
      void queryClient.invalidateQueries({ queryKey: cartKeys.user(userId) })
    }
    void queryClient.invalidateQueries({ queryKey: key })
    void queryClient.invalidateQueries({ queryKey: orderKeys.all(userId), exact: true })
    return 'applied'
  }
}

function patchOrder(queryClient: QueryClient, key: readonly unknown[], event: OrderUpdatedEvent) {
  queryClient.setQueryData<Order>(key, (old) =>
    old && event.version > old.version
      ? {
          ...old,
          status: event.payload.status,
          failureReason: event.payload.failureReason,
          version: event.version,
        }
      : old,
  )
}

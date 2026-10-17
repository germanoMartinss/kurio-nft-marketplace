import type { QueryClient } from '@tanstack/react-query'

import type { NftUpdatedEvent, OrderUpdatedEvent } from '@/contracts/realtime'
import { sessionStore } from '@/features/auth/session-store'

import { createNftEventApplier } from './nft-sync'
import { createOrderEventApplier } from './order-sync'
import type { RealtimeSocket } from './socket'

/**
 * Liga os eventos da sessão (`nft.updated` e `order.updated`) ao cache. Devolve a função que desfaz tudo (listeners e assinatura),
 * chamada ao fim do ciclo de vida do componente raiz.
 *
 * Reconciliação: após uma reconexão, eventos podem ter sido perdidos; todas as consultas ativas
 * são rebuscadas do REST, que é a fonte da verdade.
 */
export function bindRealtimeSync(
  queryClient: QueryClient,
  subscribe: (listener: (socket: RealtimeSocket | null) => void) => () => void,
) {
  const apply = createNftEventApplier(queryClient)
  const applyOrder = createOrderEventApplier(queryClient, () => sessionStore.get()?.user.id ?? null)
  let release: (() => void) | null = null

  const unsubscribe = subscribe((socket) => {
    release?.()
    release = null
    if (!socket) return
    // Se o socket já está conectado, esta é a primeira conexão; a próxima será uma reconexão.
    let connections = socket.connected ? 1 : 0
    const onUpdated = (event: NftUpdatedEvent) => void apply(event)
    const onConnect = () => {
      connections += 1
      if (connections > 1) void queryClient.invalidateQueries()
    }
    const onOrderUpdated = (event: OrderUpdatedEvent) => void applyOrder(event)
    socket.on('nft.updated', onUpdated)
    socket.on('order.updated', onOrderUpdated)
    socket.on('connect', onConnect)
    release = () => {
      socket.off('nft.updated', onUpdated)
      socket.off('order.updated', onOrderUpdated)
      socket.off('connect', onConnect)
    }
  })

  return () => {
    unsubscribe()
    release?.()
    release = null
  }
}

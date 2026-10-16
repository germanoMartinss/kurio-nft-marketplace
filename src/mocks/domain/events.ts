import type { NftUpdatedEvent, OrderUpdatedEvent } from '@/contracts/realtime'

import { nextId } from '../db/store'
import type { NftRecord, OrderRecord } from '../db/types'
import { connectionUserId, realtimeServer } from '../socket/server'

/**
 * Publicação dos eventos de domínio pelo servidor Socket.IO simulado. Toda alteração no banco
 * que afeta um recurso observado pelo cliente passa por aqui, de modo que REST e eventos sempre
 * refletem o mesmo estado.
 */
const history: (NftUpdatedEvent | OrderUpdatedEvent)[] = []
const HISTORY_LIMIT = 50

function remember(event: NftUpdatedEvent | OrderUpdatedEvent) {
  history.push(event)
  if (history.length > HISTORY_LIMIT) history.shift()
}

export function publishNftUpdated(nft: NftRecord) {
  const event: NftUpdatedEvent = {
    eventId: nextId('evt'),
    type: 'nft.updated',
    occurredAt: new Date().toISOString(),
    resource: { type: 'nft', id: nft.id },
    version: nft.version,
    payload: {
      price: nft.price,
      previousPrice: nft.previousPrice,
      available: nft.available,
      editions: nft.editions.map(({ id, available }) => ({ id, available })),
    },
  }
  remember(event)
  realtimeServer.emit('nft.updated', event)
  return event
}

export function publishOrderUpdated(order: OrderRecord) {
  const event: OrderUpdatedEvent = {
    eventId: nextId('evt'),
    type: 'order.updated',
    occurredAt: new Date().toISOString(),
    resource: { type: 'order', id: order.id },
    version: order.version,
    userId: order.userId,
    payload: { status: order.status, failureReason: order.failureReason },
  }
  remember(event)
  // Eventos de pedido só vão para as conexões da sessão do dono.
  realtimeServer.emit(
    'order.updated',
    event,
    (connection) => connectionUserId(connection) === order.userId,
  )
  return event
}

/**
 * Reenvia um evento já publicado (mesmo eventId e versão), para exercitar a tolerância do cliente
 * a duplicatas e a eventos antigos.
 */
export function replayEvent(eventId?: string) {
  const event = eventId ? history.find((item) => item.eventId === eventId) : history.at(-1)
  if (!event) return null
  if (event.type === 'nft.updated') realtimeServer.emit('nft.updated', event)
  else
    realtimeServer.emit(
      'order.updated',
      event,
      (connection) => connectionUserId(connection) === event.userId,
    )
  return event
}

export function eventHistory() {
  return [...history]
}

import * as z from 'zod/mini'

import { ethAmountSchema, isoDateTimeSchema } from './common'
import { orderStatusSchema } from './order'

/**
 * Contrato do canal Socket.IO, compartilhado entre o cliente (`src/realtime`) e o servidor
 * simulado (`src/mocks/socket`).
 *
 * Todo evento de domínio tem identidade estável (`eventId`), recurso afetado e versão. O cliente
 * descarta eventos já vistos e eventos com versão menor ou igual à que já conhece.
 */

/** Dados enviados no handshake (pacote CONNECT do Socket.IO). */
export const handshakeAuthSchema = z.object({ token: z.optional(z.string()) })
export type HandshakeAuth = z.infer<typeof handshakeAuthSchema>

const envelope = <T extends 'nft' | 'order'>(resourceType: T) => ({
  eventId: z.string(),
  occurredAt: isoDateTimeSchema,
  resource: z.object({ type: z.literal(resourceType), id: z.string() }),
  version: z.int(),
})

export const nftUpdatedEventSchema = z.object({
  ...envelope('nft'),
  type: z.literal('nft.updated'),
  payload: z.object({
    price: ethAmountSchema,
    previousPrice: z.nullable(ethAmountSchema),
    available: z.int(),
    editions: z.array(z.object({ id: z.string(), available: z.int() })),
  }),
})
export type NftUpdatedEvent = z.infer<typeof nftUpdatedEventSchema>

export const orderUpdatedEventSchema = z.object({
  ...envelope('order'),
  type: z.literal('order.updated'),
  /** Dono do pedido: o servidor só envia às conexões dessa sessão. */
  userId: z.string(),
  payload: z.object({ status: orderStatusSchema, failureReason: z.nullable(z.string()) }),
})
export type OrderUpdatedEvent = z.infer<typeof orderUpdatedEventSchema>

/** Diagnóstico de ida e volta pelo canal (painel de mocks). */
export const diagnosticsPingSchema = z.object({ sentAt: z.number() })
export type DiagnosticsPing = z.infer<typeof diagnosticsPingSchema>
export type DiagnosticsPong = { sentAt: number; serverTime: string }

export interface ServerToClientEvents {
  'nft.updated': (event: NftUpdatedEvent) => void
  'order.updated': (event: OrderUpdatedEvent) => void
  'diagnostics.pong': (payload: DiagnosticsPong) => void
}

export interface ClientToServerEvents {
  'diagnostics.ping': (payload: DiagnosticsPing) => void
}

/**
 * Caminho do Socket.IO. Não usamos o padrão `/socket.io/` porque o MSW 2.x remove esse prefixo da
 * URL do cliente antes de comparar com o `ws.link`, o que exigiria declarar o link só com a origem
 * e faria o handler capturar também outros WebSockets da mesma origem (como o HMR do Vite).
 */
export const SOCKET_PATH = '/realtime/'

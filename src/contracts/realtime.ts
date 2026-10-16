import { z } from 'zod'

/**
 * Contrato do canal Socket.IO, compartilhado entre o cliente (`src/realtime`) e o servidor
 * simulado (`src/mocks/socket`). Os mapas abaixo tipam `socket.on`/`socket.emit` no cliente.
 */

/** Dados enviados no handshake (pacote CONNECT do Socket.IO). */
export const handshakeAuthSchema = z.object({
  token: z.string().min(1).optional(),
})
export type HandshakeAuth = z.infer<typeof handshakeAuthSchema>

/** Diagnóstico de ida e volta pelo canal (usado no painel de mocks e nos testes). */
export const diagnosticsPingSchema = z.object({ sentAt: z.number() })
export const diagnosticsPongSchema = z.object({ sentAt: z.number(), serverTime: z.iso.datetime() })
export type DiagnosticsPing = z.infer<typeof diagnosticsPingSchema>
export type DiagnosticsPong = z.infer<typeof diagnosticsPongSchema>

export interface ServerToClientEvents {
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

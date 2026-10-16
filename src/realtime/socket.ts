import { io, type Socket } from 'socket.io-client'

import type {
  ClientToServerEvents,
  HandshakeAuth,
  ServerToClientEvents,
} from '@/contracts/realtime'
import { SOCKET_PATH } from '@/contracts/realtime'
import { env } from '@/env'

export type RealtimeSocket = Socket<ServerToClientEvents, ClientToServerEvents>

/**
 * Cria um socket para uma sessão. Cada sessão (visitante ou usuário) tem o próprio socket:
 * ao trocar de usuário, o socket anterior é desconectado e descartado, o que impede que eventos
 * de uma sessão atualizem dados de outra.
 *
 * `transports: ['websocket']`: o mock (MSW + @mswjs/socket.io-binding) só intercepta WebSocket;
 * o long-polling do engine.io não é simulado. Ver ARCHITECTURE.md.
 */
export function createRealtimeSocket(auth: HandshakeAuth = {}): RealtimeSocket {
  return io(env.socketOrigin, {
    path: SOCKET_PATH,
    transports: ['websocket'],
    autoConnect: false,
    auth,
  })
}

import type { Socket } from 'socket.io-client'

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
export async function createRealtimeSocket(auth: HandshakeAuth = {}): Promise<RealtimeSocket> {
  // Import dinâmico, e não por acaso: o engine.io-client guarda o `WebSocket` global no momento em
  // que o módulo é avaliado. Importado cedo demais (antes de o MSW substituir o WebSocket), ele
  // ficaria com o nativo e a conexão escaparia dos mocks. Ver ARCHITECTURE.md.
  const { io } = await import('socket.io-client')
  return io(env.socketOrigin, {
    path: SOCKET_PATH,
    transports: ['websocket'],
    autoConnect: false,
    // Uma conexão própria por socket: sessões diferentes nunca compartilham o transporte.
    forceNew: true,
    auth,
  })
}

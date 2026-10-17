import { toSocketIo } from '@mswjs/socket.io-binding'
import { ws } from 'msw'

import {
  diagnosticsPingSchema,
  handshakeAuthSchema,
  SOCKET_PATH,
  type HandshakeAuth,
  type ServerToClientEvents,
} from '@/contracts/realtime'
import { env } from '@/env'

import { resolveToken } from '../domain/auth'
import { getScenario } from '../scenarios/active'

/**
 * Servidor Socket.IO simulado sobre a interceptação de WebSocket do MSW.
 *
 * O `@mswjs/socket.io-binding` (0.2.0) cuida da codificação e decodificação dos pacotes de evento,
 * mas não cobre o restante do protocolo. Este módulo completa o que falta:
 * - heartbeat: o binding anuncia `pingInterval: 25000` no pacote OPEN, mas nunca envia ping. Sem
 *   ele, o socket.io-client encerra a conexão por "ping timeout" após ~30s e reconecta em loop;
 * - handshake: o binding ignora o pacote CONNECT (`40{...}`), onde trafega o `auth` do cliente.
 *   Lemos o token dali para associar a conexão a uma sessão;
 * - registro de conexões: o binding não tem rooms nem broadcast, então mantemos as conexões
 *   abertas e filtramos os destinatários de cada evento.
 */

/** Mesmo valor anunciado pelo binding no pacote OPEN do engine.io. */
const PING_INTERVAL_MS = 25_000
const ENGINE_IO_PING = '2'
/** Pacote engine.io MESSAGE (4) + socket.io CONNECT (0) no namespace raiz, com payload opcional. */
const CONNECT_PACKET = /^40(\{.*\})?$/s

export interface RealtimeConnection {
  id: string
  connectedAt: number
  /** `null` até o pacote CONNECT chegar. */
  auth: HandshakeAuth | null
}

/** Usuário da conexão, resolvido no momento do envio: sessão expirada ou encerrada = anônimo. */
export function connectionUserId(connection: RealtimeConnection) {
  const session = resolveToken(connection.auth?.token)
  return session.kind === 'ok' ? session.user.id : null
}

interface ConnectionEntry extends RealtimeConnection {
  emit: ReturnType<typeof toSocketIo>['client']['emit']
  close: () => void
}

const connections = new Map<string, ConnectionEntry>()
let nextConnectionId = 1

/**
 * Conexões retidas (controle de testes): o servidor recusa novos sockets até ser liberado, como um
 * servidor fora do ar. Persiste na aba (sessionStorage) para valer também logo após um reload.
 */
const HOLD_KEY = 'kurio:mock:realtime-hold'
const isHeld = () => {
  try {
    return sessionStorage.getItem(HOLD_KEY) === '1'
  } catch {
    return false
  }
}

function toWebSocketUrl(origin: string) {
  const url = new URL(SOCKET_PATH, origin)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  return url.href
}

const realtimeLink = ws.link(`${toWebSocketUrl(env.socketOrigin)}*`)

export const realtimeHandler = realtimeLink.addEventListener('connection', (connection) => {
  if (getScenario().offline || isHeld()) {
    // Servidor fora do ar: a conexão segue para a rede, onde não há servidor de socket, e o
    // handshake falha com erro de transporte, como em produção. O socket.io-client então tenta de
    // novo com backoff. Fechar a conexão aqui (`client.close`) não serve: um fechamento limpo
    // durante o handshake não dispara a reconexão do cliente.
    connection.server.connect()
    return
  }
  const io = toSocketIo(connection)
  const entry: ConnectionEntry = {
    id: `conn-${nextConnectionId++}`,
    connectedAt: Date.now(),
    auth: null,
    emit: io.client.emit.bind(io.client),
    close: () => connection.client.close(),
  }
  connections.set(entry.id, entry)

  connection.client.addEventListener('message', (event) => {
    if (typeof event.data !== 'string') return
    const match = CONNECT_PACKET.exec(event.data)
    if (!match) return
    const parsed = handshakeAuthSchema.safeParse(match[1] ? JSON.parse(match[1]) : {})
    entry.auth = parsed.success ? parsed.data : {}
  })

  const heartbeat = window.setInterval(
    () => connection.client.send(ENGINE_IO_PING),
    PING_INTERVAL_MS,
  )

  connection.client.addEventListener('close', () => {
    window.clearInterval(heartbeat)
    connections.delete(entry.id)
  })

  io.client.on('diagnostics.ping', (_event, payload: unknown) => {
    const ping = diagnosticsPingSchema.safeParse(payload)
    if (!ping.success) return
    io.client.emit('diagnostics.pong', {
      sentAt: ping.data.sentAt,
      serverTime: new Date().toISOString(),
    })
  })
})

type EventPayload<E extends keyof ServerToClientEvents> = Parameters<ServerToClientEvents[E]>[0]

/** Controle do servidor simulado, usado pelos cenários, pelo painel de mocks e pelos testes. */
export const realtimeServer = {
  connections(): RealtimeConnection[] {
    return [...connections.values()].map(({ id, connectedAt, auth }) => ({ id, connectedAt, auth }))
  },

  emit<E extends keyof ServerToClientEvents>(
    event: E,
    payload: EventPayload<E>,
    filter: (connection: RealtimeConnection) => boolean = () => true,
  ) {
    for (const entry of connections.values()) {
      if (filter(entry)) entry.emit(event, payload)
    }
  },

  /** Encerra as conexões pelo lado do servidor; o cliente reconecta sozinho. */
  disconnectAll() {
    for (const entry of connections.values()) entry.close()
  },

  /** Recusa (`true`) ou volta a aceitar (`false`) novas conexões. */
  holdConnections(hold: boolean) {
    try {
      if (hold) sessionStorage.setItem(HOLD_KEY, '1')
      else sessionStorage.removeItem(HOLD_KEY)
    } catch {
      // Sem storage, o controle não se aplica.
    }
  },
}

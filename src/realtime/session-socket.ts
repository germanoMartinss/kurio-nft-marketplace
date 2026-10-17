import { createRealtimeSocket, type RealtimeSocket } from './socket'

/**
 * Um socket por sessão. `attach` descarta o socket anterior (remove todos os listeners e
 * desconecta) antes de abrir o da nova sessão: eventos e subscriptions de um usuário nunca
 * sobrevivem à troca de usuário ou ao logout.
 */
type Listener = (socket: RealtimeSocket | null) => void
const listeners = new Set<Listener>()
let socket: RealtimeSocket | null = null
let sessionKey: string | null = null

function teardown() {
  if (!socket) return
  socket.removeAllListeners()
  socket.disconnect()
  socket = null
}

export const sessionSocket = {
  /** Abre (ou mantém) o socket da sessão `token` (ou do visitante, sem token). */
  async attach(token: string | null) {
    const key = token ?? 'guest'
    if (key === sessionKey) return
    teardown()
    sessionKey = key
    const created = await createRealtimeSocket(token ? { token } : {})
    // A sessão pode ter mudado (ou terminado) enquanto o módulo carregava: esse socket já é obsoleto.
    if (sessionKey !== key) return
    socket = created
    socket.connect()
    for (const listener of listeners) listener(socket)
  },
  detach() {
    teardown()
    sessionKey = null
    for (const listener of listeners) listener(null)
  },
  current: () => socket,
  /** Chamado a cada novo socket (e com `null` ao encerrar): é onde os consumidores assinam. */
  subscribe(listener: Listener) {
    listeners.add(listener)
    listener(socket)
    return () => listeners.delete(listener)
  },
}

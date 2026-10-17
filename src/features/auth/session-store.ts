import { useSyncExternalStore } from 'react'

import type { AuthSession, SessionUser } from '@/contracts/auth'
import { CLIENT_KEYS, readJson, writeJson } from '@/lib/client-storage'

/**
 * Sessão do cliente: token e usuário persistidos no localStorage (sobrevivem a refresh) e
 * expostos como store externa do React. O interceptor do Axios lê o token daqui.
 */
type Listener = () => void
const listeners = new Set<Listener>()
const expiryListeners = new Set<(previous: SessionUser) => void>()
let current: AuthSession | null = readJson<AuthSession>(CLIENT_KEYS.session)

function emit() {
  for (const listener of listeners) listener()
}

export const sessionStore = {
  get: () => current,
  set(session: AuthSession | null) {
    current = session
    writeJson(CLIENT_KEYS.session, session)
    emit()
  },
  /** Atualiza só os dados do usuário (ex.: perfil alterado), mantendo o token. */
  setUser(user: SessionUser) {
    if (current) this.set({ ...current, user })
  },
  /**
   * A API recusou o token (401). Só vale se o token recusado ainda é o da sessão atual: a
   * resposta tardia de uma sessão anterior não pode derrubar quem entrou depois.
   */
  expire(rejectedToken: string) {
    if (!current || current.token !== rejectedToken) return
    const previous = current.user
    this.set(null)
    for (const listener of expiryListeners) listener(previous)
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  onExpired(listener: (previous: SessionUser) => void) {
    expiryListeners.add(listener)
    return () => expiryListeners.delete(listener)
  },
}

// Outra aba entrou ou saiu: mantém esta aba coerente.
window.addEventListener('storage', (event) => {
  if (event.key !== CLIENT_KEYS.session) return
  current = readJson<AuthSession>(CLIENT_KEYS.session)
  emit()
})

export function useSession(): AuthSession | null {
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.get)
}

export function useSessionUser(): SessionUser | null {
  return useSession()?.user ?? null
}

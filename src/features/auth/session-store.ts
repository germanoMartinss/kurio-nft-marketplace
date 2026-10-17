import { useSyncExternalStore } from 'react'

import type { AuthSession, SessionUser } from '@/contracts/auth'
import { CLIENT_KEYS, readJson, writeJson } from '@/lib/client-storage'

/**
 * Sessão do cliente: token e usuário persistidos no localStorage (sobrevivem a refresh) e
 * expostos como store externa do React. O interceptor do Axios lê o token daqui.
 */
type Listener = () => void
const listeners = new Set<Listener>()
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
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
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

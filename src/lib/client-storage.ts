/**
 * Estado do cliente persistido no navegador. Todas as chaves usam o prefixo `kurio:app:`, que o
 * reset dos mocks limpa para restaurar um cenário conhecido.
 */
export const CLIENT_KEYS = {
  session: 'kurio:app:session',
  guestId: 'kurio:app:guest-id',
} as const

export function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function writeJson(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Sem storage (navegação privada restrita): o estado vale só para esta página.
  }
}

/** Identificador do visitante, criado na primeira vez, para o carrinho sem login. */
export function getGuestId() {
  const existing = readJson<string>(CLIENT_KEYS.guestId)
  if (existing) return existing
  const id = crypto.randomUUID()
  writeJson(CLIENT_KEYS.guestId, id)
  return id
}

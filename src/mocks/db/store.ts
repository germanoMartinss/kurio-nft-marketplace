import { createSeedState } from './seed'
import type { DbState } from './types'

const STORAGE_KEY = 'kurio:mock:db'

/**
 * Banco do backend simulado: um único estado em memória, carregado do localStorage e salvo a
 * cada alteração. Os handlers MSW e o servidor de socket leem e escrevem aqui, o que mantém
 * catálogo, favoritos, carrinho, perfil, carteiras e pedidos consistentes entre REST e eventos.
 */
let state: DbState = load()

function load(): DbState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DbState
      if (parsed.schemaVersion === 1) return parsed
    }
  } catch {
    // Estado corrompido ou localStorage indisponível: recomeça do seed.
  }
  return createSeedState()
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Sem persistência (ex.: cota excedida): o estado continua válido em memória.
  }
}

export function db(): Readonly<DbState> {
  return state
}

/** Única forma de alterar o estado; persiste ao final. */
export function mutate<T>(change: (draft: DbState) => T): T {
  const result = change(state)
  persist()
  return result
}

/** Restaura integralmente o estado conhecido do seed. */
export function resetDb() {
  state = createSeedState()
  persist()
}

/** Id determinístico e legível: ord_0001, qte_0002, evt_0003... */
export function nextId(prefix: string) {
  return mutate((draft) => {
    draft.sequence += 1
    return `${prefix}_${String(draft.sequence).padStart(4, '0')}`
  })
}

import { DEFAULT_SCENARIO_ID, findScenario, type Scenario } from './definitions'

const STORAGE_KEY = 'kurio:mock:scenario'

/**
 * Cenário ativo da camada de mocks. Escolhido por `?cenario=<id>` na URL (útil para links de
 * demonstração e para os testes) ou pelo painel /mocks, e persistido no localStorage.
 */
let active: Scenario = findScenario(readStored()) ?? findScenario(DEFAULT_SCENARIO_ID)!

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function getScenario() {
  return active
}

export function setScenario(id: string) {
  const scenario = findScenario(id)
  if (!scenario) throw new Error(`Cenário desconhecido: ${id}`)
  active = scenario
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Sem localStorage o cenário vale só para esta página.
  }
  resetScenarioCounters()
}

/** Contadores por cenário (falhas com limite, timeouts, ordem das respostas), zerados na troca. */
const counters = new Map<string, number>()

export function nextCount(key: string) {
  const value = (counters.get(key) ?? 0) + 1
  counters.set(key, value)
  return value
}

export function resetScenarioCounters() {
  counters.clear()
  random = createRandom(SEED)
}

/** PRNG com semente fixa (mulberry32): latências variáveis reproduzíveis entre execuções. */
const SEED = 20261016
let random = createRandom(SEED)

function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function nextRandom() {
  return random()
}

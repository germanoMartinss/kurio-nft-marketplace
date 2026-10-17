import { setupWorker } from 'msw/browser'

import type { NftUpdatedEvent } from '@/contracts/realtime'
import { env } from '@/env'

import { db, mutate, resetDb } from './db/store'
import { updateNft } from './domain/catalog'
import { eventHistory, replayEvent } from './domain/events'
import { resumePendingSettlements } from './domain/orders'
import { handlers } from './handlers'
import { getScenario, resetScenarioCounters, setScenario } from './scenarios/active'
import { findScenario, SCENARIOS } from './scenarios/definitions'
import { realtimeServer } from './socket/server'

export const worker = setupWorker(...handlers)

/** Chaves do localStorage que pertencem ao cliente (sessão, visitante, rascunhos). */
const CLIENT_STORAGE_PREFIX = 'kurio:app:'

/** Reset completo: banco do seed, contadores do cenário e estado do cliente (fica deslogado). */
function resetAll() {
  resetDb()
  resetScenarioCounters()
  try {
    for (const key of Object.keys(localStorage))
      if (key.startsWith(CLIENT_STORAGE_PREFIX)) localStorage.removeItem(key)
    sessionStorage.clear()
  } catch {
    // Sem storage não há estado de cliente para limpar.
  }
}

/**
 * Ponto de controle dos mocks para o painel /mocks e para os testes Playwright. Tudo aqui age
 * sobre o backend simulado (banco e servidor de socket); nada altera o estado da interface
 * diretamente: a interface só muda pelas respostas REST e pelos eventos Socket.IO.
 */
export const mockControl = {
  scenarios: {
    list: () => SCENARIOS.map(({ id, label, description }) => ({ id, label, description })),
    active: () => getScenario().id,
    set: setScenario,
  },
  reset: resetAll,
  nft: {
    get: (id: string) => db().nfts[id],
    /** Altera preço/disponibilidade no banco e publica `nft.updated`. */
    update: updateNft,
  },
  session: {
    /** Expira todas as sessões ativas: a próxima requisição privada recebe 401 SESSION_EXPIRED. */
    expireAll: () =>
      mutate((draft) => {
        for (const session of Object.values(draft.sessions))
          session.expiresAt = new Date(0).toISOString()
      }),
  },
  realtime: {
    connections: realtimeServer.connections,
    /** Derruba as conexões pelo lado do servidor; o cliente reconecta sozinho. */
    disconnectAll: realtimeServer.disconnectAll,
    /** Reenvia um evento já publicado (duplicata/evento antigo); sem id, o último. */
    replay: replayEvent,
    /** Publica um evento arbitrário (ex.: versão antiga com outro `eventId`) pelo servidor de socket. */
    emit: (event: NftUpdatedEvent) => realtimeServer.emit('nft.updated', event),
    history: eventHistory,
  },
}

declare global {
  interface Window {
    __kurioMock?: typeof mockControl
  }
}

/** `?cenario=<id>` seleciona o cenário e `?reset=1` restaura o seed, antes de a aplicação subir. */
function applyUrlControls() {
  const url = new URL(window.location.href)
  const scenario = url.searchParams.get('cenario')
  const reset = url.searchParams.has('reset')
  if (reset) resetAll()
  if (scenario && findScenario(scenario)) setScenario(scenario)
  if (scenario !== null || reset) {
    url.searchParams.delete('cenario')
    url.searchParams.delete('reset')
    window.history.replaceState(window.history.state, '', url)
  }
}

export async function startMockWorker() {
  applyUrlControls()
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' },
    quiet: env.isProduction,
    onUnhandledRequest(request, print) {
      // Assets e módulos passam direto; chamadas à API sem handler indicam lacuna de contrato.
      if (new URL(request.url).pathname.startsWith(env.apiBaseUrl)) print.error()
    },
  })
  resumePendingSettlements()
  window.__kurioMock = mockControl
}

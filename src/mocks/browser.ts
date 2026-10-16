import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { handlers } from './handlers'
import { realtimeServer } from './socket/server'

export const worker = setupWorker(...handlers)

/** Ponto de controle dos mocks para inspeção manual e para os testes Playwright. */
export const mockControl = { realtime: realtimeServer }

declare global {
  interface Window {
    __kurioMock?: typeof mockControl
  }
}

export async function startMockWorker() {
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' },
    quiet: env.isProduction,
    onUnhandledRequest(request, print) {
      // Assets e módulos passam direto; chamadas à API sem handler indicam lacuna de contrato.
      if (new URL(request.url).pathname.startsWith(env.apiBaseUrl)) print.error()
    },
  })
  window.__kurioMock = mockControl
}

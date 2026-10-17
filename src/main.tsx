import './styles/index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createQueryClient } from './app/query-client'
import { createAppRouter } from './app/router'
import { bindSessionLifecycle } from './app/session-lifecycle'
import { env } from './env'

async function enableMocking() {
  if (!env.enableMocks) return
  // Import dinâmico: com os mocks desativados, o código do MSW nem é baixado.
  const { startMockWorker } = await import('./mocks/browser')
  await startMockWorker()
}

/**
 * Baixa em paralelo com o início dos mocks o código da tela de entrada, que só seria pedido depois
 * que o MSW estivesse pronto (uma ida e volta de rede a menos no caminho crítico). Não executa nada.
 */
function preloadEntryScreen() {
  const path = window.location.pathname
  if (path === '/') void import('./features/catalog/home-page')
  else if (path.startsWith('/nft/')) void import('./features/nft/nft-detail-page')
}

async function startApp() {
  preloadEntryScreen()
  // Os mocks precisam estar ativos antes da primeira requisição e da primeira conexão do socket.
  await enableMocking()

  const queryClient = createQueryClient()
  const router = createAppRouter(queryClient)
  bindSessionLifecycle(queryClient, router)

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}

void startApp()

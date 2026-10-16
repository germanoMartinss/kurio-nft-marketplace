import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

/** Falhas que podem se resolver numa nova tentativa: rede, timeout, 408, 429 e 5xx. */
export function isTransientError(error: unknown) {
  if (!isAxiosError(error) || error.code === 'ERR_CANCELED') return false
  const status = error.response?.status
  return status === undefined || status === 408 || status === 429 || status >= 500
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        // Só repete o que pode dar certo na próxima tentativa; 4xx é definitivo.
        retry: (failureCount, error) => failureCount < 2 && isTransientError(error),
      },
      // Mutations nunca são repetidas automaticamente: reenvio de pedido só com chave de idempotência.
      mutations: { retry: false },
    },
  })
}

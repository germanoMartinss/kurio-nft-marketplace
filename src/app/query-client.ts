import { QueryClient } from '@tanstack/react-query'

import { ApiRequestError } from '@/api/errors'

/** Falhas que podem se resolver numa nova tentativa: rede, timeout e 5xx. */
export function isTransientError(error: unknown) {
  return error instanceof ApiRequestError && error.isTransient
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

import type { QueryClient } from '@tanstack/react-query'
import { redirect, type ParsedLocation } from '@tanstack/react-router'

import { ApiRequestError } from '@/api/errors'
import { getSession } from '@/api/auth'

import { sessionStore } from './session-store'

/**
 * `beforeLoad` das rotas privadas. Sem sessão local, vai ao login e volta para o destino
 * original (`?redirect=`). Com sessão, confirma com a API antes de renderizar: um token
 * expirado é detectado na navegação, não só quando a primeira consulta da tela falha.
 * Falha de rede não bloqueia: a tela mostra o próprio estado de erro.
 */
export async function requireAuth({
  context,
  location,
}: {
  context: { queryClient: QueryClient }
  location: ParsedLocation
}) {
  const toLogin = () => redirect({ to: '/entrar', search: { redirect: location.href } })
  const session = sessionStore.get()
  if (!session) throw toLogin()
  try {
    await context.queryClient.fetchQuery({
      queryKey: ['user', session.user.id, 'session'],
      queryFn: ({ signal }) => getSession(signal),
      staleTime: 0,
      retry: false,
    })
  } catch (error) {
    // O interceptor do Axios já encerrou a sessão recusada; aqui só interrompemos a navegação.
    if (error instanceof ApiRequestError && error.status === 401) throw toLogin()
  }
}

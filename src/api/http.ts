import axios from 'axios'

import { env } from '@/env'
import { sessionStore } from '@/features/auth/session-store'
import { getGuestId } from '@/lib/client-storage'

import { ApiRequestError, toApiRequestError } from './errors'

/**
 * Instância única do Axios. Toda chamada REST da aplicação passa por aqui: o interceptor de
 * requisição anexa o token da sessão (Bearer) e o id do visitante; o de resposta normaliza os
 * erros para `ApiRequestError`.
 */
export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
  headers: { Accept: 'application/json' },
})

http.interceptors.request.use((config) => {
  const session = sessionStore.get()
  if (session?.token) config.headers.Authorization = `Bearer ${session.token}`
  config.headers['X-Guest-Id'] = getGuestId()
  return config
})

http.interceptors.response.use(undefined, (error) => {
  const normalized = toApiRequestError(error)
  // Sessão recusada pela API (expirada ou inválida): encerra a sessão que enviou esse token.
  if (
    normalized instanceof ApiRequestError &&
    normalized.status === 401 &&
    (normalized.code === 'SESSION_EXPIRED' || normalized.code === 'UNAUTHENTICATED')
  ) {
    const header = (error as { config?: { headers?: { Authorization?: unknown } } }).config?.headers
      ?.Authorization
    if (typeof header === 'string' && header.startsWith('Bearer '))
      sessionStore.expire(header.slice('Bearer '.length))
  }
  return Promise.reject(normalized)
})

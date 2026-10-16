import axios from 'axios'

import { env } from '@/env'
import { CLIENT_KEYS, getGuestId, readJson } from '@/lib/client-storage'

import { toApiRequestError } from './errors'

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
  const session = readJson<{ token: string }>(CLIENT_KEYS.session)
  if (session?.token) config.headers.Authorization = `Bearer ${session.token}`
  config.headers['X-Guest-Id'] = getGuestId()
  return config
})

http.interceptors.response.use(undefined, (error) => Promise.reject(toApiRequestError(error)))

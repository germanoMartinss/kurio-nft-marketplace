import axios from 'axios'

import { env } from '@/env'

/**
 * Instância única do Axios. Toda chamada REST da aplicação passa por aqui; interceptors de
 * sessão e normalização de erros são registrados neste módulo.
 */
export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
  headers: { Accept: 'application/json' },
})

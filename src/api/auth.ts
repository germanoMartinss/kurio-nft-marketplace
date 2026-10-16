import {
  authSessionSchema,
  currentSessionSchema,
  type LoginRequest,
  type RegisterRequest,
} from '@/contracts/auth'

import { http } from './http'
import { parseResponse } from './parse'

export async function login(body: LoginRequest) {
  const { data } = await http.post<unknown>('/auth/login', body)
  return parseResponse(authSessionSchema, data)
}

export async function register(body: RegisterRequest) {
  const { data } = await http.post<unknown>('/auth/register', body)
  return parseResponse(authSessionSchema, data)
}

export async function getSession(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/auth/session', { signal })
  return parseResponse(currentSessionSchema, data)
}

export async function logout() {
  await http.post('/auth/logout')
}

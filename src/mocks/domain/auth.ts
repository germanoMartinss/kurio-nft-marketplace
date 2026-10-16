import { HttpResponse } from 'msw'

import type { SessionUser } from '@/contracts/auth'
import { randomId } from '@/lib/ids'

import { db, mutate } from '../db/store'
import type { UserRecord } from '../db/types'
import { apiError } from '../handlers/http'
import { getScenario } from '../scenarios/active'

const PBKDF2_ITERATIONS = 100_000

/** PBKDF2-SHA256 via WebCrypto; mesmo algoritmo usado para gerar os hashes das fixtures. */
export async function hashPassword(password: string, salt: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: new TextEncoder().encode(salt),
      iterations: PBKDF2_ITERATIONS,
    },
    key,
    256,
  )
  return [...new Uint8Array(bits)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(user: UserRecord, password: string) {
  return (await hashPassword(password, user.passwordSalt)) === user.passwordHash
}

export function toSessionUser(user: UserRecord): SessionUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
  }
}

export function createSession(userId: string) {
  const token = randomId('ses')
  const now = Date.now()
  const session = {
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + getScenario().sessionTtlMs).toISOString(),
  }
  mutate((draft) => {
    draft.sessions[token] = session
  })
  return { token, ...session }
}

function bearerToken(request: Request) {
  const header = request.headers.get('authorization')
  return header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null
}

export type SessionResolution =
  | { kind: 'ok'; token: string; user: UserRecord; expiresAt: string }
  | { kind: 'anonymous' }
  | { kind: 'error'; response: Response }

/** Resolve a sessão de um token, sem depender de uma requisição (usado também pelo socket). */
export function resolveToken(token: string | null | undefined): SessionResolution {
  if (!token) return { kind: 'anonymous' }
  const session = db().sessions[token]
  const user = session ? db().users[session.userId] : undefined
  if (!session || !user) {
    return {
      kind: 'error',
      response: apiError(401, 'UNAUTHENTICATED', 'Sessão inválida. Entre novamente.'),
    }
  }
  if (Date.parse(session.expiresAt) <= Date.now()) {
    mutate((draft) => {
      delete draft.sessions[token]
    })
    return {
      kind: 'error',
      response: apiError(401, 'SESSION_EXPIRED', 'Sua sessão expirou. Entre novamente.'),
    }
  }
  return { kind: 'ok', token, user, expiresAt: session.expiresAt }
}

export function resolveSession(request: Request) {
  return resolveToken(bearerToken(request))
}

/** Para rotas privadas: devolve o usuário ou a resposta de erro (401/403). */
export function requireUser(
  request: Request,
): { user: UserRecord; token: string } | { response: Response } {
  const session = resolveSession(request)
  if (session.kind === 'error') return { response: session.response }
  if (session.kind === 'anonymous') {
    return { response: apiError(401, 'UNAUTHENTICATED', 'Entre na sua conta para continuar.') }
  }
  if (getScenario().forbiddenPrivate) {
    return {
      response: apiError(403, 'FORBIDDEN', 'Você não tem permissão para acessar este recurso.'),
    }
  }
  return { user: session.user, token: session.token }
}

export const noContent = () => new HttpResponse(null, { status: 204 })

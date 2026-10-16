import { HttpResponse } from 'msw'

import {
  loginRequestSchema,
  registerRequestSchema,
  type AuthSession,
  type CurrentSession,
} from '@/contracts/auth'

import { db, mutate, nextId } from '../db/store'
import {
  createSession,
  hashPassword,
  noContent,
  resolveSession,
  toSessionUser,
  verifyPassword,
} from '../domain/auth'

import { apiError, parseBody, route } from './http'

/** Nomes de usuário reservados: exercitam erro de validação vindo da API. */
const RESERVED_USERNAMES = ['admin', 'kurio', 'suporte']

export const authHandlers = [
  route('post', '/auth/register', async ({ request }) => {
    const parsed = await parseBody(request, registerRequestSchema)
    if ('response' in parsed) return parsed.response
    const { username, email, password } = parsed.data
    const users = Object.values(db().users)
    if (RESERVED_USERNAMES.includes(username)) {
      return apiError(422, 'VALIDATION', 'Revise os campos destacados.', {
        fieldErrors: { username: 'Este nome de usuário é reservado.' },
      })
    }
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return apiError(409, 'EMAIL_TAKEN', 'Já existe uma conta com este e-mail.', {
        fieldErrors: { email: 'Já existe uma conta com este e-mail.' },
      })
    }
    if (users.some((user) => user.username === username)) {
      return apiError(409, 'USERNAME_TAKEN', 'Este nome de usuário já está em uso.', {
        fieldErrors: { username: 'Este nome de usuário já está em uso.' },
      })
    }
    const id = nextId('usr')
    const salt = crypto.randomUUID()
    const user = {
      id,
      displayName: username,
      username,
      email: email.toLowerCase(),
      ensName: '',
      walletNickname: 'Principal',
      avatarUrl: null,
      passwordSalt: salt,
      passwordHash: await hashPassword(password, salt),
    }
    mutate((draft) => {
      draft.users[id] = user
      draft.wallets[id] = []
      draft.favorites[id] = []
    })
    const session = createSession(id)
    return HttpResponse.json<AuthSession>(
      { token: session.token, expiresAt: session.expiresAt, user: toSessionUser(user) },
      { status: 201 },
    )
  }),

  route('post', '/auth/login', async ({ request }) => {
    const parsed = await parseBody(request, loginRequestSchema)
    if ('response' in parsed) return parsed.response
    const user = Object.values(db().users).find(
      (candidate) => candidate.email.toLowerCase() === parsed.data.email.toLowerCase(),
    )
    // Mesma mensagem para e-mail inexistente e senha errada: não revela quais e-mails têm conta.
    if (!user || !(await verifyPassword(user, parsed.data.password))) {
      return apiError(401, 'INVALID_CREDENTIALS', 'E-mail ou senha incorretos.')
    }
    const session = createSession(user.id)
    return HttpResponse.json<AuthSession>({
      token: session.token,
      expiresAt: session.expiresAt,
      user: toSessionUser(user),
    })
  }),

  route('get', '/auth/session', ({ request }) => {
    const session = resolveSession(request)
    if (session.kind === 'error') return session.response
    if (session.kind === 'anonymous')
      return apiError(401, 'UNAUTHENTICATED', 'Nenhuma sessão ativa.')
    return HttpResponse.json<CurrentSession>({
      expiresAt: session.expiresAt,
      user: toSessionUser(session.user),
    })
  }),

  route('post', '/auth/logout', ({ request }) => {
    const session = resolveSession(request)
    if (session.kind === 'ok') {
      mutate((draft) => {
        delete draft.sessions[session.token]
      })
    }
    // Logout é idempotente: sem sessão válida também responde 204.
    return noContent()
  }),
]

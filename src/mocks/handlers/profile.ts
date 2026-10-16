import { HttpResponse } from 'msw'

import {
  AVATAR_MAX_BYTES,
  avatarUpdateSchema,
  passwordChangeSchema,
  profileUpdateSchema,
  type Profile,
} from '@/contracts/profile'

import { db, mutate } from '../db/store'
import type { UserRecord } from '../db/types'
import { hashPassword, noContent, requireUser, verifyPassword } from '../domain/auth'

import { apiError, parseBody, route } from './http'

const toProfile = ({ passwordHash: _hash, passwordSalt: _salt, ...profile }: UserRecord): Profile =>
  profile

export const profileHandlers = [
  route('get', '/profile', ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    return HttpResponse.json<Profile>(toProfile(auth.user))
  }),

  route('patch', '/profile', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const parsed = await parseBody(request, profileUpdateSchema)
    if ('response' in parsed) return parsed.response
    const others = Object.values(db().users).filter((user) => user.id !== auth.user.id)
    if (others.some((user) => user.username === parsed.data.username)) {
      return apiError(409, 'USERNAME_TAKEN', 'Este nome de usuário já está em uso.', {
        fieldErrors: { username: 'Este nome de usuário já está em uso.' },
      })
    }
    if (others.some((user) => user.email.toLowerCase() === parsed.data.email.toLowerCase())) {
      return apiError(409, 'EMAIL_TAKEN', 'Já existe uma conta com este e-mail.', {
        fieldErrors: { email: 'Já existe uma conta com este e-mail.' },
      })
    }
    const updated = mutate((draft) => {
      const user = draft.users[auth.user.id]!
      Object.assign(user, { ...parsed.data, email: parsed.data.email.toLowerCase() })
      return user
    })
    return HttpResponse.json<Profile>(toProfile(updated))
  }),

  route('put', '/profile/avatar', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const parsed = await parseBody(request, avatarUpdateSchema)
    if ('response' in parsed) return parsed.response
    const base64 = parsed.data.dataUrl.slice(parsed.data.dataUrl.indexOf(',') + 1)
    if ((base64.length * 3) / 4 > AVATAR_MAX_BYTES) {
      return apiError(422, 'VALIDATION', 'A imagem deve ter no máximo 1 MB.', {
        fieldErrors: { dataUrl: 'A imagem deve ter no máximo 1 MB.' },
      })
    }
    const updated = mutate((draft) => {
      const user = draft.users[auth.user.id]!
      user.avatarUrl = parsed.data.dataUrl
      return user
    })
    return HttpResponse.json<Profile>(toProfile(updated))
  }),

  route('delete', '/profile/avatar', ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const updated = mutate((draft) => {
      const user = draft.users[auth.user.id]!
      user.avatarUrl = null
      return user
    })
    return HttpResponse.json<Profile>(toProfile(updated))
  }),

  route('post', '/profile/password', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const parsed = await parseBody(request, passwordChangeSchema)
    if ('response' in parsed) return parsed.response
    const { currentPassword, newPassword } = parsed.data
    if (!(await verifyPassword(auth.user, currentPassword))) {
      return apiError(422, 'VALIDATION', 'Revise os campos destacados.', {
        fieldErrors: { currentPassword: 'Senha atual incorreta.' },
      })
    }
    if (currentPassword === newPassword) {
      return apiError(422, 'VALIDATION', 'Revise os campos destacados.', {
        fieldErrors: { newPassword: 'A nova senha deve ser diferente da atual.' },
      })
    }
    const salt = crypto.randomUUID()
    const hash = await hashPassword(newPassword, salt)
    mutate((draft) => {
      const user = draft.users[auth.user.id]!
      user.passwordSalt = salt
      user.passwordHash = hash
      // As outras sessões do usuário são encerradas; a atual continua válida.
      for (const [token, session] of Object.entries(draft.sessions)) {
        if (session.userId === auth.user.id && token !== auth.token) delete draft.sessions[token]
      }
    })
    return noContent()
  }),
]

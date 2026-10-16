import { HttpResponse } from 'msw'

import type { Favorites } from '@/contracts/favorites'

import { db, mutate } from '../db/store'
import { requireUser } from '../domain/auth'
import { findNft } from '../domain/catalog'

import { apiError, route } from './http'

const favoritesOf = (userId: string): Favorites => ({ nftIds: db().favorites[userId] ?? [] })

export const favoriteHandlers = [
  route('get', '/favorites', ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    return HttpResponse.json(favoritesOf(auth.user.id))
  }),

  // PUT e DELETE são idempotentes: repetir a operação não muda o resultado.
  route<{ nftId: string }>('put', '/favorites/:nftId', ({ request, params }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    if (!findNft(params.nftId)) return apiError(404, 'NOT_FOUND', 'NFT não encontrado.')
    mutate((draft) => {
      const list = (draft.favorites[auth.user.id] ??= [])
      if (!list.includes(params.nftId)) list.push(params.nftId)
    })
    return HttpResponse.json(favoritesOf(auth.user.id))
  }),

  route<{ nftId: string }>('delete', '/favorites/:nftId', ({ request, params }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    mutate((draft) => {
      draft.favorites[auth.user.id] = (draft.favorites[auth.user.id] ?? []).filter(
        (id) => id !== params.nftId,
      )
    })
    return HttpResponse.json(favoritesOf(auth.user.id))
  }),
]

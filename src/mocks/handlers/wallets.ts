import { HttpResponse } from 'msw'

import {
  walletCreateSchema,
  walletInputSchema,
  type Wallet,
  type WalletConnection,
} from '@/contracts/wallet'

import { db, mutate, nextId } from '../db/store'
import { requireUser } from '../domain/auth'
import { getScenario } from '../scenarios/active'

import { apiError, parseBody, route } from './http'

const walletsOf = (userId: string) => db().wallets[userId] ?? []

export const walletHandlers = [
  route('get', '/wallets', ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    return HttpResponse.json({ items: walletsOf(auth.user.id) })
  }),

  route('post', '/wallets', async ({ request }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    const parsed = await parseBody(request, walletCreateSchema)
    if ('response' in parsed) return parsed.response
    if (walletsOf(auth.user.id).some((wallet) => wallet.kind === parsed.data.kind)) {
      const label = parsed.data.kind === 'principal' ? 'principal' : 'secundária'
      return apiError(409, 'VALIDATION', `Você já tem uma carteira ${label}. Edite a existente.`)
    }
    if (
      walletsOf(auth.user.id).some(
        (wallet) => wallet.address.toLowerCase() === parsed.data.address.toLowerCase(),
      )
    ) {
      return apiError(422, 'VALIDATION', 'Revise os campos destacados.', {
        fieldErrors: { address: 'Este endereço já está cadastrado.' },
      })
    }
    const wallet: Wallet = { ...parsed.data, id: nextId('wal') }
    mutate((draft) => {
      ;(draft.wallets[auth.user.id] ??= []).push(wallet)
    })
    return HttpResponse.json<Wallet>(wallet, { status: 201 })
  }),

  route<{ id: string }>('put', '/wallets/:id', async ({ request, params }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    if (!walletsOf(auth.user.id).some((wallet) => wallet.id === params.id)) {
      return apiError(404, 'NOT_FOUND', 'Carteira não encontrada.')
    }
    const parsed = await parseBody(request, walletInputSchema)
    if ('response' in parsed) return parsed.response
    const updated = mutate((draft) => {
      const wallet = draft.wallets[auth.user.id]!.find((item) => item.id === params.id)!
      Object.assign(wallet, parsed.data)
      return wallet
    })
    return HttpResponse.json<Wallet>(updated)
  }),

  /** Simula a conexão com a extensão da carteira (aceita ou recusada, conforme o cenário). */
  route<{ id: string }>('post', '/wallets/:id/connect', ({ request, params }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    if (!walletsOf(auth.user.id).some((wallet) => wallet.id === params.id)) {
      return apiError(404, 'NOT_FOUND', 'Carteira não encontrada.')
    }
    if (getScenario().walletConnection === 'recusada') {
      return apiError(409, 'WALLET_REJECTED', 'A conexão foi recusada na carteira.')
    }
    return HttpResponse.json<WalletConnection>({ walletId: params.id, status: 'conectada' })
  }),

  route<{ id: string }>('post', '/wallets/:id/disconnect', ({ request, params }) => {
    const auth = requireUser(request)
    if ('response' in auth) return auth.response
    return HttpResponse.json<WalletConnection>({ walletId: params.id, status: 'desconectada' })
  }),
]

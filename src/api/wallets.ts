import {
  walletConnectionSchema,
  walletListSchema,
  walletSchema,
  type WalletCreate,
  type WalletInput,
} from '@/contracts/wallet'

import { http } from './http'
import { parseResponse } from './parse'

export async function listWallets(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/wallets', { signal })
  return parseResponse(walletListSchema, data)
}

export async function createWallet(body: WalletCreate) {
  const { data } = await http.post<unknown>('/wallets', body)
  return parseResponse(walletSchema, data)
}

export async function updateWallet(id: string, body: WalletInput) {
  const { data } = await http.put<unknown>(`/wallets/${encodeURIComponent(id)}`, body)
  return parseResponse(walletSchema, data)
}

export async function connectWallet(id: string) {
  const { data } = await http.post<unknown>(`/wallets/${encodeURIComponent(id)}/connect`)
  return parseResponse(walletConnectionSchema, data)
}

export async function disconnectWallet(id: string) {
  const { data } = await http.post<unknown>(`/wallets/${encodeURIComponent(id)}/disconnect`)
  return parseResponse(walletConnectionSchema, data)
}

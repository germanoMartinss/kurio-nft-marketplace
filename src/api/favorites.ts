import { favoritesSchema } from '@/contracts/favorites'

import { http } from './http'
import { parseResponse } from './parse'

export async function getFavorites(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/favorites', { signal })
  return parseResponse(favoritesSchema, data)
}

export async function addFavorite(nftId: string) {
  const { data } = await http.put<unknown>(`/favorites/${encodeURIComponent(nftId)}`)
  return parseResponse(favoritesSchema, data)
}

export async function removeFavorite(nftId: string) {
  const { data } = await http.delete<unknown>(`/favorites/${encodeURIComponent(nftId)}`)
  return parseResponse(favoritesSchema, data)
}

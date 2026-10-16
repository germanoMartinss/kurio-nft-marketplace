import {
  catalogPageSchema,
  highlightsSchema,
  nftDetailSchema,
  type CatalogQuery,
} from '@/contracts/nft'

import { http } from './http'
import { parseResponse } from './parse'

/** Converte a consulta do catálogo em query string (listas separadas por vírgula). */
export function catalogParams(query: CatalogQuery) {
  const params: Record<string, string> = {}
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0))
      continue
    params[key] = Array.isArray(value) ? value.join(',') : String(value)
  }
  return params
}

export async function listNfts(query: CatalogQuery, signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/nfts', { params: catalogParams(query), signal })
  return parseResponse(catalogPageSchema, data)
}

export async function getHighlights(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/nfts/highlights', { signal })
  return parseResponse(highlightsSchema, data)
}

export async function getNft(id: string, signal?: AbortSignal) {
  const { data } = await http.get<unknown>(`/nfts/${encodeURIComponent(id)}`, { signal })
  return parseResponse(nftDetailSchema, data)
}

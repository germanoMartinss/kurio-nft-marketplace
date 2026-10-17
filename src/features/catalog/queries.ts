import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import { getHighlights, getNft, listNfts } from '@/api/nfts'
import type { CatalogQuery } from '@/contracts/nft'

/**
 * Chaves públicas do catálogo. A consulta inteira faz parte da chave: cada combinação de filtros
 * tem seu próprio cache, e uma resposta antiga nunca ocupa o lugar da consulta atual.
 */
export const catalogKeys = {
  all: ['nfts'] as const,
  lists: () => [...catalogKeys.all, 'list'] as const,
  list: (query: CatalogQuery) => [...catalogKeys.lists(), query] as const,
  details: () => [...catalogKeys.all, 'detail'] as const,
  detail: (id: string) => [...catalogKeys.details(), id] as const,
  highlights: () => [...catalogKeys.all, 'highlights'] as const,
}

export const catalogQueryOptions = (query: CatalogQuery) =>
  queryOptions({
    queryKey: catalogKeys.list(query),
    // O signal cancela a requisição quando a consulta deixa de ser a atual (ex.: filtro trocado).
    queryFn: ({ signal }) => listNfts(query, signal),
    // Mantém a página anterior visível enquanto a nova carrega, sem pular o layout.
    placeholderData: keepPreviousData,
  })

export const nftQueryOptions = (id: string) =>
  queryOptions({
    queryKey: catalogKeys.detail(id),
    queryFn: ({ signal }) => getNft(id, signal),
  })

export const highlightsQueryOptions = () =>
  queryOptions({
    queryKey: catalogKeys.highlights(),
    queryFn: ({ signal }) => getHighlights(signal),
    staleTime: 5 * 60_000,
  })

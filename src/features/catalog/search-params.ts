import { ethAmountSchema, networkSchema, type Network } from '@/contracts/common'
import {
  catalogSortSchema,
  catalogTabSchema,
  categorySchema,
  type CatalogQuery,
  type CatalogSort,
  type CatalogTab,
  type Category,
} from '@/contracts/nft'

/**
 * Estado do catálogo na URL (fonte da verdade): sobrevive a refresh, é compartilhável e cada
 * mudança vira uma entrada no histórico. Nomes em pt-BR; listas separadas por vírgula para a URL
 * continuar legível. Valores inválidos são descartados em vez de quebrar a página.
 */
export interface CatalogSearch {
  busca?: string
  colecoes?: string
  redes?: string
  precoMin?: string
  precoMax?: string
  aba?: CatalogTab
  ordem?: CatalogSort
  pagina?: number
}

const parseList = <T extends string>(value: unknown, check: (item: string) => boolean): T[] =>
  typeof value === 'string' ? (value.split(',').filter(check) as T[]) : []

const joinList = (values: string[]) =>
  values.length ? [...new Set(values)].sort().join(',') : undefined

export function validateCatalogSearch(search: Record<string, unknown>): CatalogSearch {
  const busca =
    typeof search.busca === 'string' && search.busca.trim()
      ? search.busca.trim().slice(0, 80)
      : undefined
  const colecoes = joinList(
    parseList<Category>(search.colecoes, (v) => categorySchema.safeParse(v).success),
  )
  const redes = joinList(
    parseList<Network>(search.redes, (v) => networkSchema.safeParse(v).success),
  )
  const precoMin = ethAmountSchema.safeParse(String(search.precoMin ?? '')).data
  const precoMax = ethAmountSchema.safeParse(String(search.precoMax ?? '')).data
  const aba = catalogTabSchema.safeParse(search.aba).data
  const ordem = catalogSortSchema.safeParse(search.ordem).data
  const pagina = Number(search.pagina)
  return {
    busca,
    colecoes,
    redes,
    precoMin,
    precoMax,
    aba: aba === 'todos' ? undefined : aba,
    ordem: ordem === 'recentes' ? undefined : ordem,
    pagina: Number.isInteger(pagina) && pagina > 1 ? pagina : undefined,
  }
}

export const selectedCategories = (search: CatalogSearch) =>
  parseList<Category>(search.colecoes, (v) => categorySchema.safeParse(v).success)
export const selectedNetworks = (search: CatalogSearch) =>
  parseList<Network>(search.redes, (v) => networkSchema.safeParse(v).success)

export const CATALOG_PAGE_SIZE = 9

/** Converte o estado da URL nos parâmetros enviados à API. */
export function toCatalogQuery(search: CatalogSearch): CatalogQuery {
  return {
    q: search.busca,
    categories: selectedCategories(search),
    networks: selectedNetworks(search),
    minPrice: search.precoMin,
    maxPrice: search.precoMax,
    tab: search.aba ?? 'todos',
    sort: search.ordem ?? 'recentes',
    page: search.pagina ?? 1,
    pageSize: CATALOG_PAGE_SIZE,
  }
}

/** Atualização de filtro: reinicia a paginação, como exige o enunciado. */
export function withFilter(search: CatalogSearch, change: Partial<CatalogSearch>): CatalogSearch {
  return validateCatalogSearch({ ...search, ...change, pagina: undefined })
}

export function toggleInList(list: string | undefined, value: string) {
  const values = list ? list.split(',') : []
  return joinList(
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value],
  )
}

export const hasActiveFilters = (search: CatalogSearch) =>
  Boolean(
    search.busca ||
    search.colecoes ||
    search.redes ||
    search.precoMin ||
    search.precoMax ||
    search.aba,
  )

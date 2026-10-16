import {
  CATEGORY_LABELS,
  catalogSortSchema,
  catalogTabSchema,
  categorySchema,
  type CatalogPage,
  type NftDetail,
  type NftSummary,
} from '@/contracts/nft'
import { ethAmountSchema, NETWORK_LABELS, networkSchema } from '@/contracts/common'
import { compareEth, eth, toEthAmount } from '@/lib/money'

import { HIGHLIGHT_IDS } from '../fixtures/nfts'
import { db, mutate } from '../db/store'
import type { NftRecord } from '../db/types'
import { getScenario } from '../scenarios/active'

import { publishNftUpdated } from './events'

export const DEFAULT_PAGE_SIZE = 9
const MAX_PAGE_SIZE = 36
/** Quantos dos NFTs mais recentes contam como "Novos lançamentos". */
const NEW_RELEASES = 12

export function toSummary(nft: NftRecord): NftSummary {
  const {
    id,
    name,
    tokenId,
    image,
    category,
    collection,
    network,
    price,
    previousPrice,
    rarity,
    available,
    version,
  } = nft
  return {
    id,
    name,
    tokenId,
    image,
    category,
    collection,
    network,
    price,
    previousPrice,
    rarity,
    available,
    version,
  }
}

export function toDetail(nft: NftRecord): NftDetail {
  const { trending: _trending, ...detail } = nft
  return detail
}

function allNfts(): NftRecord[] {
  return getScenario().emptyCatalog ? [] : Object.values(db().nfts)
}

const list = (value: string | null) => (value ? value.split(',').filter(Boolean) : [])
const valid = <T>(values: string[], check: (value: string) => boolean) =>
  values.filter(check) as T[]

/** GET /api/nfts — busca, filtros combináveis, aba, ordenação e paginação. */
export function queryCatalog(params: URLSearchParams): CatalogPage {
  const q = params.get('q')?.trim().toLowerCase() ?? ''
  const categories = valid<string>(
    list(params.get('categories')),
    (v) => categorySchema.safeParse(v).success,
  )
  const networks = valid<string>(
    list(params.get('networks')),
    (v) => networkSchema.safeParse(v).success,
  )
  const minPrice = ethAmountSchema.safeParse(params.get('minPrice')).data
  const maxPrice = ethAmountSchema.safeParse(params.get('maxPrice')).data
  const tab = catalogTabSchema.safeParse(params.get('tab')).data ?? 'todos'
  const sort = catalogSortSchema.safeParse(params.get('sort')).data ?? 'recentes'
  const collection = params.get('collection')
  const pageSize = clamp(Number(params.get('pageSize')) || DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE)
  const requestedPage = Math.max(1, Math.floor(Number(params.get('page')) || 1))

  const catalog = allNfts()
  const newest = new Set(
    [...catalog]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, NEW_RELEASES)
      .map((nft) => nft.id),
  )

  // Cada predicado é um filtro; as facetas contam ignorando o próprio filtro.
  const predicates = {
    q: (nft: NftRecord) =>
      !q ||
      [nft.name, nft.collection, nft.creator, CATEGORY_LABELS[nft.category]].some((field) =>
        field.toLowerCase().includes(q),
      ),
    categories: (nft: NftRecord) => categories.length === 0 || categories.includes(nft.category),
    networks: (nft: NftRecord) => networks.length === 0 || networks.includes(nft.network),
    price: (nft: NftRecord) =>
      (!minPrice || compareEth(nft.price, minPrice) >= 0) &&
      (!maxPrice || compareEth(nft.price, maxPrice) <= 0),
    tab: (nft: NftRecord) =>
      tab === 'todos' || (tab === 'novos' ? newest.has(nft.id) : nft.trending),
    collection: (nft: NftRecord) => !collection || nft.collection === collection,
  }
  type Key = keyof typeof predicates
  const matches = (nft: NftRecord, except?: Key) =>
    (Object.keys(predicates) as Key[]).every((key) => key === except || predicates[key](nft))

  const filtered = catalog.filter((nft) => matches(nft)).sort(comparator(sort))
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const page = Math.min(requestedPage, totalPages)

  const count = (key: Key, field: 'category' | 'network', id: string) =>
    catalog.filter((nft) => nft[field] === id && matches(nft, key)).length

  const prices = catalog.map((nft) => eth(nft.price))
  return {
    items: filtered.slice((page - 1) * pageSize, page * pageSize).map(toSummary),
    page,
    pageSize,
    total: filtered.length,
    totalPages,
    facets: {
      categories: categorySchema.options.map((id) => ({
        id,
        label: CATEGORY_LABELS[id],
        count: count('categories', 'category', id),
      })),
      networks: networkSchema.options.map((id) => ({
        id,
        label: NETWORK_LABELS[id],
        count: count('networks', 'network', id),
      })),
      priceRange: {
        min: prices.length ? toEthAmount(prices.reduce((a, b) => (a.lt(b) ? a : b))) : '0',
        max: prices.length ? toEthAmount(prices.reduce((a, b) => (a.gt(b) ? a : b))) : '0',
      },
    },
  }
}

function comparator(sort: string) {
  switch (sort) {
    case 'menor-preco':
      return (a: NftRecord, b: NftRecord) =>
        compareEth(a.price, b.price) || a.name.localeCompare(b.name, 'pt-BR')
    case 'maior-preco':
      return (a: NftRecord, b: NftRecord) =>
        compareEth(b.price, a.price) || a.name.localeCompare(b.name, 'pt-BR')
    case 'nome':
      return (a: NftRecord, b: NftRecord) => a.name.localeCompare(b.name, 'pt-BR')
    default:
      return (a: NftRecord, b: NftRecord) => b.createdAt.localeCompare(a.createdAt)
  }
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function findNft(id: string): NftRecord | undefined {
  return getScenario().emptyCatalog ? undefined : db().nfts[id]
}

export function highlights() {
  const nfts = db().nfts
  return {
    hero: HIGHLIGHT_IDS.hero.map((id) => toSummary(nfts[id]!)),
    featured: toSummary(nfts[HIGHLIGHT_IDS.featured]!),
  }
}

/**
 * Altera preço ou disponibilidade de um NFT: incrementa a versão e publica `nft.updated`.
 * Usado pelos cenários, pela liquidação de pedidos e pelo controle de mocks dos testes.
 */
export function updateNft(
  id: string,
  change: { price?: string; previousPrice?: string | null; editions?: Record<string, number> },
) {
  const updated = mutate((draft) => {
    const nft = draft.nfts[id]
    if (!nft) return null
    if (change.price !== undefined) {
      nft.previousPrice = change.previousPrice !== undefined ? change.previousPrice : nft.price
      nft.price = change.price
    }
    for (const [editionId, available] of Object.entries(change.editions ?? {})) {
      const edition = nft.editions.find((item) => item.id === editionId)
      if (edition) edition.available = Math.max(0, available)
    }
    nft.available = nft.editions.reduce((sum, edition) => sum + edition.available, 0)
    nft.version += 1
    return nft
  })
  if (updated) publishNftUpdated(updated)
  return updated
}

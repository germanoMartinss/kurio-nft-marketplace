import type { QueryClient } from '@tanstack/react-query'
import * as z from 'zod/mini'

import { nftUpdatedEventSchema, type NftUpdatedEvent } from '@/contracts/realtime'

import type { Cart } from '@/contracts/cart'
import type { CatalogPage, Highlights, NftDetail, NftSummary } from '@/contracts/nft'
import { catalogKeys } from '@/features/catalog/queries'

/** Quantos `eventId` já vistos ficam na memória (os mais antigos saem primeiro). */
const SEEN_LIMIT = 500

/**
 * Aplica `nft.updated` aos caches do catálogo, do detalhe e do carrinho.
 *
 * - **Duplicatas**: o `eventId` já visto é ignorado (nada é reaplicado).
 * - **Eventos antigos**: um evento só vale se a versão for maior que a última conhecida do NFT
 *   (aplicada por evento ou presente no cache vinda do REST); estado nunca regride.
 * - **Carrinho**: os valores são calculados pela API; o evento só marca o carrinho como desatualizado
 *   e ele é rebuscado (a API devolve preço, avisos e totais coerentes entre si).
 */
export function createNftEventApplier(queryClient: QueryClient) {
  const seen = new Set<string>()
  const lastVersion = new Map<string, number>()

  return function apply(raw: unknown): 'applied' | 'duplicate' | 'stale' | 'invalid' {
    const parsed = z.safeParse(nftUpdatedEventSchema, raw)
    if (!parsed.success) return 'invalid'
    const event = parsed.data
    if (seen.has(event.eventId)) return 'duplicate'
    seen.add(event.eventId)
    if (seen.size > SEEN_LIMIT) seen.delete(seen.values().next().value!)

    const nftId = event.resource.id
    if (event.version <= (lastVersion.get(nftId) ?? 0)) return 'stale'
    lastVersion.set(nftId, event.version)

    patchDetail(queryClient, event)
    patchLists(queryClient, event)
    refreshCarts(queryClient, nftId)
    return 'applied'
  }
}

const withEvent = <T extends NftSummary>(item: T, event: NftUpdatedEvent): T =>
  // O cache pode já ter uma versão mais nova (vinda do REST): nunca regride.
  event.version <= item.version
    ? item
    : {
        ...item,
        price: event.payload.price,
        previousPrice: event.payload.previousPrice,
        available: event.payload.available,
        version: event.version,
      }

function patchDetail(queryClient: QueryClient, event: NftUpdatedEvent) {
  queryClient.setQueryData<NftDetail>(catalogKeys.detail(event.resource.id), (old) => {
    if (!old || event.version <= old.version) return old
    const available = new Map(
      event.payload.editions.map((edition) => [edition.id, edition.available]),
    )
    return {
      ...withEvent(old, event),
      editions: old.editions.map((edition) => ({
        ...edition,
        available: available.get(edition.id) ?? edition.available,
      })),
    }
  })
}

function patchLists(queryClient: QueryClient, event: NftUpdatedEvent) {
  const patch = (item: NftSummary) =>
    item.id === event.resource.id ? withEvent(item, event) : item
  queryClient.setQueriesData<CatalogPage>({ queryKey: catalogKeys.lists() }, (old) =>
    old ? { ...old, items: old.items.map(patch) } : old,
  )
  queryClient.setQueryData<Highlights>(catalogKeys.highlights(), (old) =>
    old ? { hero: old.hero.map(patch), featured: patch(old.featured) } : old,
  )
  // Preço novo pode mudar filtro, ordem e facetas: as listas ativas são rebuscadas do REST.
  void queryClient.invalidateQueries({ queryKey: catalogKeys.lists() })
}

function refreshCarts(queryClient: QueryClient, nftId: string) {
  void queryClient.invalidateQueries({
    predicate: ({ queryKey, state }) =>
      (queryKey[0] === 'user' || queryKey[0] === 'guest') &&
      queryKey[2] === 'cart' &&
      ((state.data as Cart | undefined)?.items.some((item) => item.nftId === nftId) ?? false),
  })
}

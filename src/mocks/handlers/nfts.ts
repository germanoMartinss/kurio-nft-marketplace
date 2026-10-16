import { HttpResponse } from 'msw'

import type { CatalogPage, Highlights, NftDetail } from '@/contracts/nft'

import { findNft, highlights, queryCatalog, toDetail } from '../domain/catalog'

import { apiError, route } from './http'

export const nftHandlers = [
  route(
    'get',
    '/nfts',
    ({ request }) =>
      HttpResponse.json<CatalogPage>(queryCatalog(new URL(request.url).searchParams)),
    { catalogList: true },
  ),

  // Antes de /nfts/:id, para "highlights" não ser lido como identificador.
  route('get', '/nfts/highlights', () => HttpResponse.json<Highlights>(highlights())),

  route<{ id: string }>('get', '/nfts/:id', ({ params }) => {
    const nft = findNft(params.id)
    if (!nft) return apiError(404, 'NOT_FOUND', 'NFT não encontrado.')
    return HttpResponse.json<NftDetail>(toDetail(nft))
  }),
]

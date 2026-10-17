import { createFileRoute } from '@tanstack/react-router'

import { nftQueryOptions } from '@/features/catalog/queries'
import { NftDetailPage } from '@/features/nft/nft-detail-page'

export const Route = createFileRoute('/nft/$nftId')({
  // Pré-carrega sem bloquear (hover/foco em links): a tela mostra o skeleton e os estados.
  loader: ({ context, params }) => {
    void context.queryClient.prefetchQuery(nftQueryOptions(params.nftId))
  },
  component: NftRoute,
})

function NftRoute() {
  const { nftId } = Route.useParams()
  return <NftDetailPage nftId={nftId} />
}

import type { UseQueryResult } from '@tanstack/react-query'

import { EmptyState, ErrorState } from '@/components/common/query-states'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import type { CatalogPage } from '@/contracts/nft'
import { cn } from '@/lib/utils'

import { NftCard, NftCardSkeleton } from './nft-card'
import { Pagination } from './pagination'
import { CATALOG_PAGE_SIZE } from './search-params'

const gridClass =
  'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:gap-x-8 lg:gap-y-[72px] max-sm:[&>*:nth-child(even)]:translate-y-8'

/**
 * Resultados do catálogo com todos os estados: carregamento (skeleton com as dimensões finais),
 * erro com nova tentativa, vazio, sucesso e atualização em segundo plano.
 */
export function CatalogResults({
  query,
  onClearFilters,
}: {
  query: UseQueryResult<CatalogPage>
  onClearFilters: () => void
}) {
  const { data, isPending, isError, error, isFetching, isPlaceholderData, refetch } = query

  if (isPending) {
    return (
      <div aria-busy="true" className="flex flex-col gap-12 lg:gap-[88px]">
        <p className="sr-only" role="status">
          Carregando NFTs
        </p>
        <div className={gridClass}>
          {Array.from({ length: CATALOG_PAGE_SIZE }, (_, index) => (
            <NftCardSkeleton key={index} />
          ))}
        </div>
        {/* Reserva o espaço da paginação, para o que vem abaixo não se deslocar. */}
        <Skeleton className="h-[53px] lg:h-[17px]" />
      </div>
    )
  }

  if (isError && !data) {
    return (
      <ErrorState
        title="Não foi possível carregar o catálogo"
        message={`${error.message} Verifique sua conexão e tente novamente.`}
        onRetry={() => void refetch()}
        retrying={isFetching}
      />
    )
  }

  if (data.total === 0) {
    return (
      <EmptyState
        title="Nenhum NFT encontrado"
        message="Nenhum NFT corresponde à busca e aos filtros selecionados. Ajuste os filtros ou limpe-os para ver o catálogo completo."
        action={<Button onClick={onClearFilters}>Limpar filtros</Button>}
      />
    )
  }

  const updating = isFetching && isPlaceholderData
  return (
    <div className="flex flex-col gap-12 lg:gap-[88px]" aria-busy={updating}>
      <p className="sr-only" role="status">
        {updating
          ? 'Atualizando resultados'
          : `${data.total} NFTs encontrados, página ${data.page} de ${data.totalPages}`}
      </p>
      {isError ? (
        <p role="alert" className="flex flex-wrap items-center gap-3 text-14 text-coral">
          Não foi possível atualizar os resultados.
          <Button size="sm" variant="outline" onClick={() => void refetch()}>
            Tentar novamente
          </Button>
        </p>
      ) : null}
      <div className={cn(gridClass, 'transition-opacity', updating && 'opacity-60')}>
        {data.items.map((nft, index) => (
          <NftCard key={nft.id} nft={nft} priority={index < 3} />
        ))}
      </div>
      <Pagination page={data.page} totalPages={data.totalPages} />
    </div>
  )
}

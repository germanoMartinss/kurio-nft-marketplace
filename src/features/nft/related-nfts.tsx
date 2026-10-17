import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useId, useRef, useState } from 'react'

import { NftImage } from '@/components/nft/nft-image'
import { Price } from '@/components/nft/price'
import { Skeleton } from '@/components/ui/skeleton'
import type { NftDetail, NftSummary } from '@/contracts/nft'
import { catalogQueryOptions } from '@/features/catalog/queries'
import { cn } from '@/lib/utils'

/** Três grupos de cinco cards, como o carrossel do Figma (cinco cards e três indicadores). */
const RELATED_LIMIT = 15

/**
 * "Mais desta coleção": primeiro os NFTs da mesma categoria (nas fixtures cada coleção repete uma
 * única arte e cada categoria tem poucos itens), completados com os mais recentes do catálogo até
 * três grupos de cinco, em lista com rolagem horizontal (snap) e indicadores de página.
 */
export function RelatedNfts({ nft }: { nft: NftDetail }) {
  const sameCategory = useQuery(
    catalogQueryOptions({ categories: [nft.category], pageSize: 12, sort: 'recentes' }),
  )
  const recent = useQuery(catalogQueryOptions({ pageSize: 24, sort: 'recentes' }))
  const seen = new Set([nft.id])
  const items = [...(sameCategory.data?.items ?? []), ...(recent.data?.items ?? [])]
    .filter((item) => !seen.has(item.id) && Boolean(seen.add(item.id)))
    .slice(0, RELATED_LIMIT)
  return (
    <NftCarousel
      title="Mais desta coleção"
      items={items}
      isPending={sameCategory.isPending || recent.isPending}
    />
  )
}

/** Lista horizontal de NFTs com snap e indicadores de página (detalhe e carrinho). */
export function NftCarousel({
  title,
  items,
  isPending,
}: {
  title: string
  items: NftSummary[]
  isPending: boolean
}) {
  const titleId = useId()
  const listRef = useRef<HTMLUListElement>(null)
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(items.length / 5))

  const goTo = (target: number) => {
    const list = listRef.current
    if (!list) return
    list.scrollTo({ left: target * list.clientWidth, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby={titleId} className="container-page flex flex-col gap-8">
      <h2 id={titleId} className="border-b border-border pb-2 text-17 font-bold text-accent-text">
        {title}
      </h2>
      <ul
        ref={listRef}
        onScroll={(event) => {
          const list = event.currentTarget
          setPage(Math.round(list.scrollLeft / Math.max(list.clientWidth, 1)))
        }}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-2 lg:gap-6"
      >
        {isPending
          ? Array.from({ length: 5 }, (_, index) => (
              <li key={index} className="w-[45%] shrink-0 sm:w-[30%] lg:w-[calc((100%-96px)/5)]">
                <Skeleton className="aspect-[195/227] w-full" />
              </li>
            ))
          : items.map((item) => (
              <li
                key={item.id}
                className="relative w-[45%] shrink-0 snap-start sm:w-[30%] lg:w-[calc((100%-96px)/5)]"
              >
                <div className="flex aspect-[195/227] items-center justify-center bg-card p-3">
                  <NftImage
                    image={item.image}
                    alt={item.name}
                    sizes="(min-width: 1024px) 190px, 40vw"
                    className="aspect-square w-full overflow-hidden rounded-[15px]"
                  />
                </div>
                <h3 className="mt-3 text-15 leading-4">
                  <Link
                    to="/nft/$nftId"
                    params={{ nftId: item.id }}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-ring"
                  >
                    {item.name}
                  </Link>
                </h3>
                <Price value={item.price} className="mt-1 text-15" />
              </li>
            ))}
      </ul>
      {isPending ? (
        // Reserva a linha dos indicadores enquanto carrega: o conteúdo abaixo não se desloca.
        <div aria-hidden="true" className="h-6" />
      ) : pages > 1 ? (
        <div className="flex justify-center gap-1">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para o grupo ${index + 1} de ${pages}`}
              aria-pressed={index === page}
              onClick={() => goTo(index)}
              className="flex size-6 items-center justify-center"
            >
              <span
                className={cn(
                  'size-2.5 rounded-full border border-primary',
                  index === page && 'bg-primary',
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}

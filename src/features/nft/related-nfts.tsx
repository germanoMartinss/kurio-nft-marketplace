import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { NftImage } from '@/components/nft/nft-image'
import { Price } from '@/components/nft/price'
import { Skeleton } from '@/components/ui/skeleton'
import type { NftDetail } from '@/contracts/nft'
import { catalogQueryOptions } from '@/features/catalog/queries'
import { cn } from '@/lib/utils'

/**
 * "Mais desta coleção": NFTs da mesma categoria (nas fixtures cada coleção repete uma única arte),
 * em lista com rolagem horizontal (snap) e indicadores de página.
 */
export function RelatedNfts({ nft }: { nft: NftDetail }) {
  const { data, isPending } = useQuery(
    catalogQueryOptions({ categories: [nft.category], pageSize: 12, sort: 'recentes' }),
  )
  const items = (data?.items ?? []).filter((item) => item.id !== nft.id)
  const listRef = useRef<HTMLUListElement>(null)
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(items.length / 5))

  const goTo = (target: number) => {
    const list = listRef.current
    if (!list) return
    list.scrollTo({ left: target * list.clientWidth, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="relacionados-titulo" className="container-page flex flex-col gap-8">
      <h2
        id="relacionados-titulo"
        className="border-b border-border pb-2 text-17 font-bold text-accent-text"
      >
        Mais desta coleção
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
      {pages > 1 ? (
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

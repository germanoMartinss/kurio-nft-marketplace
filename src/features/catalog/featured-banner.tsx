import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { NftImage } from '@/components/nft/nft-image'
import { Skeleton } from '@/components/ui/skeleton'

import { highlightsQueryOptions } from './queries'

/** Bloco "NFT em destaque — oferta limitada" da sidebar do Figma. */
export function FeaturedBanner() {
  const { data } = useQuery(highlightsQueryOptions())
  const featured = data?.featured

  return (
    <section
      aria-labelledby="destaque-titulo"
      className="flex h-[470px] flex-col gap-2.5 bg-[linear-gradient(180deg,rgb(210_138_76/0.1)_0%,rgb(210_138_76/0.03)_100%)] pt-6 pb-1"
    >
      <div className="flex flex-col gap-5 px-5">
        <h2 id="destaque-titulo" className="text-24 font-bold text-accent-text">
          NFT EM DESTAQUE
        </h2>
        <p className="text-center text-22 leading-4 font-bold">OFERTA LIMITADA</p>
      </div>
      {featured ? (
        <Link
          to="/nft/$nftId"
          params={{ nftId: featured.id }}
          className="mt-auto block h-[368px] overflow-hidden rounded-[22px]"
        >
          <NftImage
            image={featured.image}
            alt={`${featured.name}, NFT em destaque`}
            sizes="310px"
            className="size-full"
          />
        </Link>
      ) : (
        <Skeleton className="mt-auto h-[368px] rounded-[22px]" />
      )}
    </section>
  )
}

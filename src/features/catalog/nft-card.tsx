import { Link } from '@tanstack/react-router'

import { ZoomIn } from '@/components/icons'
import { NftImage } from '@/components/nft/nft-image'
import { Price } from '@/components/nft/price'
import { Skeleton } from '@/components/ui/skeleton'
import type { NftSummary } from '@/contracts/nft'
import { FavoriteButton } from '@/features/favorites/favorite-button'

/**
 * Card do catálogo. Desktop (Figma): moldura de 258×300 com a arte de 250px, nome e preço abaixo;
 * ações aparecem ao passar o mouse ou focar. Mobile: card arredondado com favorito sempre visível.
 * O link cobre o card inteiro, e as ações ficam fora dele (sem elementos interativos aninhados).
 */
export function NftCard({ nft, priority = false }: { nft: NftSummary; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl bg-card p-2 lg:flex lg:h-[300px] lg:items-center lg:justify-center lg:rounded-none lg:p-1">
        <NftImage
          image={nft.image}
          alt={nft.name}
          sizes="(min-width: 1024px) 250px, 45vw"
          priority={priority}
          className="aspect-square overflow-hidden rounded-xl lg:size-[250px] lg:rounded-[15px]"
        />
        {nft.rarity === 'raro' ? (
          <span className="absolute top-2 left-2 rounded-tl-xl bg-primary px-2.5 py-1 text-14 font-medium text-primary-foreground lg:top-0 lg:left-0 lg:rounded-none lg:rounded-br-sm lg:text-16">
            RARO
          </span>
        ) : null}
      </div>

      <h3 className="text-16 leading-4">
        <Link
          to="/nft/$nftId"
          params={{ nftId: nft.id }}
          className="after:absolute after:-inset-1 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-ring"
        >
          {nft.name}
        </Link>
      </h3>
      <Price value={nft.price} previous={nft.previousPrice} className="-mt-1.5" />

      {/* Ações: sempre visíveis no mobile (favorito), reveladas no hover/foco no desktop. */}
      <div className="absolute top-4 right-4 z-10 lg:top-auto lg:right-auto lg:bottom-[68px] lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:gap-2 lg:opacity-0 lg:transition-opacity lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
        <FavoriteButton
          nftId={nft.id}
          name={nft.name}
          className="size-9 rounded-full bg-background/70 backdrop-blur-sm lg:size-[34px] lg:rounded-sm lg:bg-card lg:text-foreground"
        />
        <Link
          to="/nft/$nftId"
          params={{ nftId: nft.id }}
          aria-label={`Ver detalhes de ${nft.name}`}
          tabIndex={-1}
          className="hidden size-[34px] items-center justify-center rounded-sm bg-card text-foreground hover:text-accent-text lg:flex"
        >
          <ZoomIn className="size-[18px]" />
        </Link>
      </div>
    </article>
  )
}

/** Mesmas dimensões do card final, para o carregamento não deslocar o layout. */
export function NftCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <Skeleton className="aspect-square w-full rounded-2xl lg:aspect-auto lg:h-[300px] lg:rounded-none" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  )
}

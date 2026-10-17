import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { ArrowRight } from '@/components/icons'
import { NftImage } from '@/components/nft/nft-image'
import { Skeleton } from '@/components/ui/skeleton'
import type { NftSummary } from '@/contracts/nft'
import { cn } from '@/lib/utils'

import { highlightsQueryOptions } from './queries'

/**
 * Destaques do topo da página inicial. Desktop: texto à esquerda e arte de 450px à direita.
 * Mobile: card arredondado com a arte principal e uma miniatura sobreposta. O carrossel não gira
 * sozinho (o usuário controla pelos indicadores, operáveis por teclado).
 */
export function Hero() {
  const { data } = useQuery(highlightsQueryOptions())
  const [index, setIndex] = useState(0)
  const slides = data?.hero ?? []
  const current = slides[index]
  const next = slides[(index + 1) % Math.max(slides.length, 1)]

  return (
    <section aria-roledescription="carrossel" aria-label="Destaques" className="container-page">
      {/* Desktop */}
      <div className="hidden h-[450px] items-center gap-[110px] pl-10 lg:flex">
        <div className="flex w-[600px] shrink-0 flex-col gap-11">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-14 leading-4 font-medium tracking-brand">Bem-vindo à Kurio</p>
              <h1 className="text-43 font-bold">
                SEJA DONO DO FUTURO
                <br />
                DA ARTE DIGITAL
              </h1>
            </div>
            <p className="max-w-[600px] text-14 leading-6 text-muted-foreground">
              Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte
              digital rara, apoie artistas e tenha uma parte da cultura da internet.
            </p>
          </div>
          <div className="flex items-end justify-between">
            <Link
              to="/"
              hash="catalogo"
              className="flex h-10 w-[140px] items-center justify-center rounded-md bg-primary text-16 leading-5 font-bold text-primary-foreground hover:brightness-110"
            >
              EXPLORAR
            </Link>
            <SlideDots count={slides.length} index={index} onSelect={setIndex} />
          </div>
        </div>
        <div className="size-[450px] shrink-0 overflow-hidden rounded-3xl">
          {current ? <HeroArtwork nft={current} /> : <Skeleton className="size-full rounded-3xl" />}
        </div>
      </div>

      {/* Mobile */}
      <div className="relative min-h-[194px] overflow-hidden rounded-[20px] bg-card bg-[linear-gradient(145deg,rgb(210_138_76/0.3)_-46%,rgb(210_138_76/0)_103%)] px-4 pt-3 pb-2 lg:hidden">
        <div className="flex gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className="text-12 leading-4 font-bold">Bem-vindo à Kurio</p>
            <h1 className="text-18 leading-6 font-bold">
              SEJA DONO DA
              <br />
              CULTURA DIGITAL
            </h1>
            <p className="text-12 leading-4 text-muted-foreground">
              Descubra NFTs selecionados de criadores do mundo todo.
            </p>
            <Link
              to="/"
              hash="catalogo"
              className="flex w-fit items-center gap-2 text-12 font-bold text-accent-text"
            >
              EXPLORAR <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="relative size-[130px] shrink-0">
            {current ? (
              <Link
                to="/nft/$nftId"
                params={{ nftId: current.id }}
                aria-label={`Ver ${current.name}`}
              >
                <NftImage
                  image={current.image}
                  alt={current.name}
                  sizes="130px"
                  priority
                  className="size-full overflow-hidden rounded-2xl"
                />
              </Link>
            ) : (
              <Skeleton className="size-full rounded-2xl" />
            )}
            {next && slides.length > 1 ? (
              <NftImage
                image={next.image}
                alt=""
                sizes="58px"
                className="absolute -bottom-2 -left-4 size-[58px] overflow-hidden rounded-xl border-2 border-card"
              />
            ) : null}
          </div>
        </div>
        <SlideDots
          count={slides.length}
          index={index}
          onSelect={setIndex}
          className="mt-1 justify-center"
        />
      </div>
    </section>
  )
}

function HeroArtwork({ nft }: { nft: NftSummary }) {
  return (
    <Link
      to="/nft/$nftId"
      params={{ nftId: nft.id }}
      aria-label={`Ver ${nft.name}`}
      className="block size-full"
    >
      <NftImage image={nft.image} alt={nft.name} sizes="450px" priority className="size-full" />
    </Link>
  )
}

function SlideDots({
  count,
  index,
  onSelect,
  className,
}: {
  count: number
  index: number
  onSelect: (index: number) => void
  className?: string
}) {
  if (count <= 1) return null
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: count }, (_, dot) => (
        <button
          key={dot}
          type="button"
          aria-label={`Mostrar destaque ${dot + 1} de ${count}`}
          aria-pressed={dot === index}
          onClick={() => onSelect(dot)}
          className="flex size-6 items-center justify-center"
        >
          <span
            className={cn(
              'size-2 rounded-full bg-primary transition-opacity',
              dot !== index && 'opacity-50',
            )}
          />
        </button>
      ))}
    </div>
  )
}

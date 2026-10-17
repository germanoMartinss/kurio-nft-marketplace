import { useState } from 'react'

import { ZoomIn } from '@/components/icons'
import { NftImage } from '@/components/nft/nft-image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { NftDetail } from '@/contracts/nft'
import { cn } from '@/lib/utils'

/**
 * Galeria do detalhe. O Figma repete a mesma arte em quatro miniaturas; aqui cada miniatura é um
 * enquadramento diferente da obra (completa e detalhes), para a galeria ter função real.
 */
const VIEWS = [
  { label: 'Obra completa', scale: 1, origin: '50% 50%' },
  { label: 'Detalhe do rosto', scale: 1.7, origin: '50% 32%' },
  { label: 'Detalhe dos acessórios', scale: 1.9, origin: '50% 78%' },
  { label: 'Recorte lateral', scale: 1.5, origin: '22% 45%' },
] as const

export function Gallery({ nft }: { nft: NftDetail }) {
  const [active, setActive] = useState(0)
  const view = VIEWS[active]!
  const transform = { transform: `scale(${view.scale})`, transformOrigin: view.origin }

  return (
    <div className="flex gap-7">
      <div
        role="group"
        aria-label="Enquadramentos da obra"
        className="hidden w-[100px] shrink-0 flex-col gap-4 lg:flex"
      >
        {VIEWS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={cn(
              'size-[100px] overflow-hidden rounded-lg bg-card ring-offset-2 ring-offset-background transition-shadow',
              index === active && 'ring-2 ring-primary',
            )}
          >
            <div
              className="size-full"
              style={{ transform: `scale(${item.scale})`, transformOrigin: item.origin }}
            >
              <NftImage image={nft.image} alt="" sizes="100px" className="size-full" />
            </div>
            <span className="sr-only">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="relative w-full overflow-hidden rounded-3xl lg:size-[444px] lg:shrink-0 lg:rounded-md lg:bg-card lg:p-4">
        <div className="aspect-square overflow-hidden rounded-3xl">
          <div className="size-full transition-transform duration-300" style={transform}>
            <NftImage
              image={nft.image}
              alt={`${nft.name}, ${view.label.toLowerCase()}`}
              sizes="(min-width: 1024px) 404px, 92vw"
              priority
              className="size-full"
            />
          </div>
        </div>
        <Dialog>
          <DialogTrigger
            aria-label={`Ampliar ${nft.name}`}
            className="absolute top-6 right-6 hidden size-[30px] items-center justify-center rounded-full bg-card/90 text-foreground hover:text-accent-text lg:flex"
          >
            <ZoomIn className="size-5" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogTitle>{nft.name}</DialogTitle>
            <DialogDescription className="sr-only">Arte ampliada do NFT</DialogDescription>
            <NftImage
              image={nft.image}
              alt={nft.name}
              sizes="500px"
              className="aspect-square w-full overflow-hidden rounded-2xl"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

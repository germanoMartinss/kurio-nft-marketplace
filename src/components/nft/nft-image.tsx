import type { NftImage as NftImageName } from '@/contracts/nft'
import { cn } from '@/lib/utils'

const WIDTHS = [160, 240, 320, 500] as const
const srcSet = (image: NftImageName, format: 'avif' | 'webp') =>
  WIDTHS.map((width) => `/assets/nfts/optimized/${image}-${width}.${format} ${width}w`).join(', ')

/**
 * Arte do NFT em AVIF/WebP responsivos (variantes geradas por `pnpm images:optimize`). Largura e
 * altura intrínsecas evitam deslocamento de layout; `priority` é para a imagem do LCP.
 */
export function NftImage({
  image,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
}: {
  image: NftImageName
  alt: string
  /** Largura ocupada pela imagem, para o navegador escolher a variante. Ex.: "(min-width: 1024px) 250px, 45vw". */
  sizes: string
  priority?: boolean
  className?: string
  imgClassName?: string
}) {
  return (
    <picture className={cn('block', className)}>
      <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
      <img
        src={`/assets/nfts/optimized/${image}-320.webp`}
        alt={alt}
        width={500}
        height={500}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn('size-full object-cover', imgClassName)}
      />
    </picture>
  )
}

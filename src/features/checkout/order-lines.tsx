import { NftImage } from '@/components/nft/nft-image'
import type { NftImage as NftImageName } from '@/contracts/nft'
import { formatEth } from '@/lib/money'

interface Line {
  key: string
  name: string
  tokenId: string
  image: NftImageName
  quantity: number
  lineTotal: string
  editionLabel: string
}

/** Itens do pedido: miniatura, nome, ID do token, "(x quantidade)" e subtotal, como nos frames. */
export function OrderLines({ lines, imageSize = 70 }: { lines: Line[]; imageSize?: 56 | 70 }) {
  return (
    <ul className="flex flex-col gap-3" aria-label="Itens do pedido">
      {lines.map((line) => (
        <li key={line.key} className="flex items-center gap-3 rounded-xs bg-card pr-3">
          <NftImage
            image={line.image}
            alt=""
            sizes={`${imageSize}px`}
            className="shrink-0 overflow-hidden rounded-l-xs"
            imgClassName={imageSize === 70 ? 'size-[70px]' : 'size-14'}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-15 leading-5 font-bold">{line.name}</span>
            <span className="text-13 leading-4 text-subtle">
              ID do token: {line.tokenId} · Edição {line.editionLabel}
            </span>
          </div>
          <span className="shrink-0 text-14 text-muted-foreground">
            <span className="sr-only">Quantidade: </span>(x {line.quantity})
          </span>
          <span className="shrink-0 text-16 font-bold text-accent-text">
            {formatEth(line.lineTotal)}
          </span>
        </li>
      ))}
    </ul>
  )
}

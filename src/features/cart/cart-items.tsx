import { Link } from '@tanstack/react-router'

import { Trash } from '@/components/icons'
import { NftImage } from '@/components/nft/nft-image'
import { Price } from '@/components/nft/price'
import { Skeleton } from '@/components/ui/skeleton'
import type { CartItem } from '@/contracts/cart'
import { QuantityStepper } from '@/features/nft/quantity-stepper'
import { formatEth } from '@/lib/money'
import { cn } from '@/lib/utils'

interface ItemActions {
  busy: boolean
  onQuantity: (item: CartItem, quantity: number) => void
  onRemove: (item: CartItem) => void
}

const isUnavailable = (item: CartItem) => item.notices.includes('indisponivel')

function RemoveButton({
  item,
  busy,
  onRemove,
  className,
}: {
  item: CartItem
  busy: boolean
  onRemove: ItemActions['onRemove']
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onRemove(item)}
      disabled={busy}
      className={cn(
        'flex size-8 items-center justify-center rounded-full text-subtle transition-colors hover:text-accent-text disabled:opacity-50',
        className,
      )}
    >
      <Trash className="size-5" aria-hidden="true" />
      <span className="sr-only">Remover {item.name} do carrinho</span>
    </button>
  )
}

function ItemName({ item }: { item: CartItem }) {
  return (
    <Link
      to="/nft/$nftId"
      params={{ nftId: item.nftId }}
      className="text-15 leading-5 font-bold hover:text-accent-text"
    >
      {item.name}
    </Link>
  )
}

/** Desktop: tabela "NFTs · Preço · Edições · Total" do Figma, uma linha em cartão por item. */
export function CartTable({
  items,
  busy,
  onQuantity,
  onRemove,
}: { items: CartItem[] } & ItemActions) {
  return (
    <table className="-mt-3 w-full table-fixed border-separate border-spacing-y-3">
      <caption className="sr-only">Itens do carrinho</caption>
      <colgroup>
        <col className="w-[40%]" />
        <col className="w-[18%]" />
        <col className="w-[17%]" />
        <col className="w-[17%]" />
        <col className="w-[8%]" />
      </colgroup>
      <thead>
        <tr className="text-left text-15 leading-5 font-bold">
          {['NFTs', 'Preço', 'Edições', 'Total'].map((heading) => (
            <th key={heading} scope="col" className="border-b border-border pb-2 font-bold">
              {heading}
            </th>
          ))}
          <th scope="col" className="border-b border-border pb-2">
            <span className="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const unavailable = isUnavailable(item)
          return (
            <tr key={item.id} className="h-[70px] bg-card">
              <td className="rounded-l-xs p-0">
                <div className="flex items-center gap-4">
                  <NftImage
                    image={item.image}
                    alt=""
                    sizes="70px"
                    className="size-[70px] shrink-0 overflow-hidden rounded-l-xs"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <ItemName item={item} />
                    <p className="text-13 leading-4 text-subtle">ID do token: {item.tokenId}</p>
                    <p className="text-13 leading-4 text-subtle">Edição: {item.editionLabel}</p>
                  </div>
                </div>
              </td>
              <td className="pr-2">
                <Price
                  value={item.unitPrice}
                  previous={item.previousUnitPrice}
                  className="text-15"
                />
              </td>
              <td>
                {unavailable ? (
                  <span className="text-13 font-bold text-coral">Esgotado</span>
                ) : (
                  <QuantityStepper
                    size="cart"
                    value={item.quantity}
                    max={item.maxQuantity}
                    subject={item.name}
                    disabled={busy}
                    onChange={(quantity) => onQuantity(item, quantity)}
                  />
                )}
              </td>
              <td
                className={cn(
                  'text-15 font-bold text-accent-text',
                  unavailable && 'text-muted-foreground line-through',
                )}
              >
                {formatEth(item.lineTotal)}
              </td>
              <td className="rounded-r-xs pr-3 text-right">
                <RemoveButton item={item} busy={busy} onRemove={onRemove} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** Mobile: cartões com a arte à esquerda, como no frame "Carrinho de NFTs". */
export function CartCards({
  items,
  busy,
  onQuantity,
  onRemove,
}: { items: CartItem[] } & ItemActions) {
  return (
    <ul className="flex flex-col gap-3.5" aria-label="Itens do carrinho">
      {items.map((item) => {
        const unavailable = isUnavailable(item)
        return (
          <li
            key={item.id}
            className="relative flex min-h-[100px] overflow-hidden rounded-xl bg-card"
          >
            <NftImage
              image={item.image}
              alt=""
              sizes="100px"
              className="w-[100px] shrink-0 self-stretch overflow-hidden"
              imgClassName="h-full w-full object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-3 pr-12 pl-3">
              <ItemName item={item} />
              <p className="text-14 leading-4 text-subtle">Edição: {item.editionLabel}</p>
              <Price
                value={item.lineTotal}
                previous={null}
                className={cn('mt-1 text-18', unavailable && 'text-muted-foreground line-through')}
              />
              {item.previousUnitPrice ? (
                <p className="text-12 text-muted-foreground">
                  Preço anterior: <s>{formatEth(item.previousUnitPrice)}</s>
                </p>
              ) : null}
              {item.quantity > 1 ? (
                <p className="sr-only">
                  {item.quantity} unidades de {formatEth(item.unitPrice)} cada
                </p>
              ) : null}
            </div>
            <div className="absolute inset-y-0 right-3 flex flex-col items-end justify-between py-2">
              <RemoveButton item={item} busy={busy} onRemove={onRemove} className="size-7" />
              {unavailable ? (
                <span className="pb-2 text-13 font-bold text-coral">Esgotado</span>
              ) : (
                <QuantityStepper
                  size="cart"
                  value={item.quantity}
                  max={item.maxQuantity}
                  subject={item.name}
                  disabled={busy}
                  className="pb-2"
                  onChange={(quantity) => onQuantity(item, quantity)}
                />
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/** Skeleton com as dimensões finais das linhas (70px no desktop, 100px no mobile). */
export function CartItemsSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3.5 lg:gap-3 lg:pt-12">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-[100px] rounded-xl lg:h-[70px] lg:rounded-xs" />
      ))}
    </div>
  )
}

import { useId } from 'react'

import type { Edition } from '@/contracts/nft'
import { cn } from '@/lib/utils'

/**
 * Edições como radios nativos estilizados em pílula: setas do teclado alternam entre as edições, e
 * uma edição esgotada fica desabilitada e anunciada ("esgotada"), não só acinzentada.
 */
export function EditionPicker({
  editions,
  value,
  onChange,
  className,
}: {
  editions: Edition[]
  value: string | undefined
  onChange: (editionId: string) => void
  className?: string
}) {
  const name = useId()
  return (
    <fieldset className={cn('flex flex-col gap-3', className)}>
      <legend className="mb-3 text-15 leading-4 font-bold lg:text-15">Edição:</legend>
      <div className="flex flex-wrap gap-1.5">
        {editions.map((edition) => {
          const soldOut = edition.available === 0
          const selected = edition.id === value
          return (
            <label
              key={edition.id}
              className={cn(
                'flex h-7 cursor-pointer items-center rounded-full border border-border-soft px-2 text-14 leading-4 text-muted-foreground transition-colors hover:border-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring',
                selected && 'border-[1.5px] border-primary font-medium text-accent-text',
                soldOut && 'cursor-not-allowed opacity-50 hover:border-border-soft',
              )}
            >
              <input
                type="radio"
                name={name}
                value={edition.id}
                checked={selected}
                disabled={soldOut}
                onChange={() => onChange(edition.id)}
                className="sr-only"
              />
              <span className={cn(soldOut && 'line-through')}>{edition.label}</span>
              <span className="sr-only">
                {soldOut
                  ? ', esgotada'
                  : edition.supply === null
                    ? ', edição aberta'
                    : `, ${edition.available} disponíveis`}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

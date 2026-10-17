import { useId, useState } from 'react'

import { Slider } from '@/components/ui/slider'
import { Skeleton } from '@/components/ui/skeleton'
import { NETWORK_LABELS, networkSchema } from '@/contracts/common'
import { CATEGORY_LABELS, categorySchema, type CatalogPage } from '@/contracts/nft'
import { eth, formatEth, toEthAmount } from '@/lib/money'
import { cn } from '@/lib/utils'

import {
  selectedCategories,
  selectedNetworks,
  toggleInList,
  type CatalogSearch,
} from './search-params'

const PRICE_STEPS = 100

/**
 * Painel de filtros do Figma (coleções, faixa de preço e rede), usado na sidebar do desktop e no
 * drawer do mobile. Coleções e redes são checkboxes nativos estilizados como a lista do layout:
 * combináveis, operáveis por teclado e anunciados com o estado e a contagem.
 */
export function FiltersPanel({
  search,
  facets,
  onChange,
  className,
}: {
  search: CatalogSearch
  facets: CatalogPage['facets'] | undefined
  onChange: (change: Partial<CatalogSearch>) => void
  className?: string
}) {
  const categories = selectedCategories(search)
  const networks = selectedNetworks(search)
  const count = (kind: 'categories' | 'networks', id: string) =>
    facets?.[kind].find((facet) => facet.id === id)?.count

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-18 leading-4 font-bold">Coleções</legend>
        <ul className="px-3">
          {categorySchema.options.map((id) => (
            <FilterOption
              key={id}
              label={CATEGORY_LABELS[id]}
              count={count('categories', id)}
              checked={categories.includes(id)}
              onToggle={() => onChange({ colecoes: toggleInList(search.colecoes, id) })}
            />
          ))}
        </ul>
      </fieldset>

      <PriceFilter search={search} facets={facets} onApply={onChange} />

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-18 leading-4 font-bold">Rede</legend>
        <ul className="pl-3">
          {networkSchema.options.map((id) => (
            <FilterOption
              key={id}
              label={NETWORK_LABELS[id]}
              count={count('networks', id)}
              checked={networks.includes(id)}
              onToggle={() => onChange({ redes: toggleInList(search.redes, id) })}
            />
          ))}
        </ul>
      </fieldset>
    </div>
  )
}

function FilterOption({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string
  count: number | undefined
  checked: boolean
  onToggle: () => void
}) {
  return (
    <li>
      <label
        className={cn(
          'flex h-10 cursor-pointer items-center justify-between gap-3 text-15 text-subtle transition-colors hover:text-foreground has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring',
          checked && 'font-medium text-accent-text hover:text-accent-text',
        )}
      >
        <span className="flex items-center gap-2">
          <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
          {/* O estado não depende só da cor: o item marcado ganha o sinal de check. */}
          <span aria-hidden="true" className={cn('w-3 text-12', !checked && 'invisible')}>
            ✓
          </span>
          {label}
        </span>
        {count === undefined ? (
          <Skeleton className="h-4 w-8" />
        ) : (
          <span className={cn(checked && 'font-bold')}>
            ({count})<span className="sr-only"> NFTs</span>
          </span>
        )}
      </label>
    </li>
  )
}

/** Faixa de preço com slider de dois controles e o botão "Aplicar" do Figma. */
function PriceFilter({
  search,
  facets,
  onApply,
}: {
  search: CatalogSearch
  facets: CatalogPage['facets'] | undefined
  onApply: (change: Partial<CatalogSearch>) => void
}) {
  const labelId = useId()
  const min = facets ? eth(facets.priceRange.min) : null
  const max = facets ? eth(facets.priceRange.max) : null
  const toStep = (value: string | undefined, fallback: number) => {
    if (!value || !min || !max || max.eq(min)) return fallback
    return Math.round(eth(value).minus(min).div(max.minus(min)).times(PRICE_STEPS).toNumber())
  }
  const fromStep = (step: number) =>
    min && max ? toEthAmount(min.plus(max.minus(min).times(step).div(PRICE_STEPS)).round(2)) : '0'

  const [draft, setDraft] = useState<[number, number] | null>(null)
  const steps: [number, number] = draft ?? [
    toStep(search.precoMin, 0),
    toStep(search.precoMax, PRICE_STEPS),
  ]
  const format = (value: string) => formatEth(value, { unit: false }).replace('.', ',')

  return (
    <fieldset className="flex flex-col gap-3">
      <legend id={labelId} className="mb-3 text-18 leading-4 font-bold">
        Faixa de preço
      </legend>
      <div className="flex flex-col gap-3 pl-3">
        {facets ? (
          <>
            <Slider
              min={0}
              max={PRICE_STEPS}
              step={1}
              value={steps}
              onValueChange={(value) => setDraft([value[0] ?? 0, value[1] ?? PRICE_STEPS])}
              thumbLabels={['Preço mínimo', 'Preço máximo']}
              getValueText={(value) => `${format(fromStep(value))} ETH`}
              className="py-2"
            />
            <p className="text-15" aria-live="polite">
              Preço: {format(fromStep(steps[0]))} - {format(fromStep(steps[1]))} ETH
            </p>
          </>
        ) : (
          <Skeleton className="h-[52px] w-full" />
        )}
        <button
          type="button"
          disabled={!facets}
          onClick={() => {
            onApply({
              precoMin: steps[0] > 0 ? fromStep(steps[0]) : undefined,
              precoMax: steps[1] < PRICE_STEPS ? fromStep(steps[1]) : undefined,
            })
            setDraft(null)
          }}
          className="h-9 w-fit rounded-md bg-primary px-3 text-16 font-bold text-primary-foreground hover:brightness-110 disabled:opacity-50"
        >
          Aplicar
        </button>
      </div>
    </fieldset>
  )
}

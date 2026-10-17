import { ChevronDown } from '@/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CatalogSort, CatalogTab } from '@/contracts/nft'
import { cn } from '@/lib/utils'

const TABS: { id: CatalogTab; label: string }[] = [
  { id: 'todos', label: 'Todos os NFTs' },
  { id: 'novos', label: 'Novos lançamentos' },
  { id: 'em-alta', label: 'Em alta' },
]

const SORT_LABELS: Record<CatalogSort, string> = {
  recentes: 'Listados recentemente',
  'menor-preco': 'Menor preço',
  'maior-preco': 'Maior preço',
  nome: 'Nome (A–Z)',
}

/** Abas de recorte do catálogo (alternam um filtro, não trocam de painel) e ordenação. */
export function CatalogTabs({
  value,
  onChange,
}: {
  value: CatalogTab
  onChange: (tab: CatalogTab) => void
}) {
  return (
    <div
      role="group"
      aria-label="Recorte do catálogo"
      className="flex min-w-0 gap-5 overflow-x-auto"
    >
      {TABS.map((tab) => {
        const active = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'shrink-0 border-b-2 border-transparent pb-1 text-15 leading-4 whitespace-nowrap transition-colors hover:text-accent-text',
              active && 'border-primary font-bold text-accent-text',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export function SortSelect({
  value,
  onChange,
}: {
  value: CatalogSort
  onChange: (sort: CatalogSort) => void
}) {
  return (
    <div className="flex items-center gap-1 text-15">
      <span id="ordenar-por">Ordenar por:</span>
      <Select value={value} onValueChange={(next) => onChange(next as CatalogSort)}>
        <SelectTrigger
          aria-labelledby="ordenar-por"
          className="h-auto gap-1 border-0 border-b-2 border-primary px-0 py-0 text-15 [&>svg]:hidden"
        >
          <SelectValue />
          <ChevronDown className="size-4" aria-hidden />
        </SelectTrigger>
        <SelectContent align="end">
          {(Object.keys(SORT_LABELS) as CatalogSort[]).map((sort) => (
            <SelectItem key={sort} value={sort}>
              {SORT_LABELS[sort]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

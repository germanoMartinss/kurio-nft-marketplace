import type { RefObject } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { CatalogPage } from '@/contracts/nft'

import { SortSelect } from './catalog-toolbar'
import { FiltersPanel } from './filters-panel'
import type { CatalogSearch } from './search-params'

/**
 * Filtros no mobile: drawer inferior com foco preso enquanto aberto e devolvido ao botão que o
 * abriu ao fechar (Radix Dialog). Cada alteração já vale na URL; "Ver resultados" só fecha.
 */
export function FiltersDrawer({
  open,
  onOpenChange,
  search,
  facets,
  total,
  onChange,
  onClear,
  returnFocusRef,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  search: CatalogSearch
  facets: CatalogPage['facets'] | undefined
  total: number | undefined
  onChange: (change: Partial<CatalogSearch>) => void
  onClear: () => void
  /** Recebe o foco ao fechar: o drawer é aberto por um botão externo, não por um SheetTrigger. */
  returnFocusRef: RefObject<HTMLElement | null>
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85dvh] rounded-t-[28px] border-border"
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          returnFocusRef.current?.focus()
        }}
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-20 font-bold">Filtros</SheetTitle>
          <SheetDescription className="text-14 text-subtle">
            Os resultados são atualizados a cada escolha.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-8 overflow-y-auto px-6 py-4">
          <SortSelect
            value={search.ordem ?? 'recentes'}
            onChange={(ordem) => onChange({ ordem })}
          />
          <FiltersPanel search={search} facets={facets} onChange={onChange} />
        </div>
        <SheetFooter className="flex-row gap-3 border-t border-border px-6 py-4">
          <Button variant="neutral" className="flex-1" onClick={onClear}>
            Limpar
          </Button>
          <Button variant="pill" className="flex-1" onClick={() => onOpenChange(false)}>
            {total === undefined
              ? 'Ver resultados'
              : `Ver ${total} resultado${total === 1 ? '' : 's'}`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

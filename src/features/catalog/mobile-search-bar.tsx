import { forwardRef, type RefObject } from 'react'

import { Filters, Search } from '@/components/icons'

/** Busca e botão de filtros do topo da home mobile (Figma). */
export const MobileSearchBar = forwardRef<
  HTMLInputElement,
  {
    value: string
    onChange: (value: string) => void
    onOpenFilters: () => void
    activeFilters: number
    /** Botão de filtros: recebe o foco de volta quando o drawer fecha. */
    filterButtonRef: RefObject<HTMLButtonElement | null>
  }
>(function MobileSearchBar(
  { value, onChange, onOpenFilters, activeFilters, filterButtonRef },
  ref,
) {
  return (
    <div className="container-page flex gap-2 pt-6 lg:hidden">
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex h-11 flex-1 items-center gap-3 rounded-xl bg-card px-4"
      >
        <Search className="size-5 shrink-0 text-subtle" aria-hidden />
        <label htmlFor="busca" className="sr-only">
          Buscar NFTs
        </label>
        <input
          ref={ref}
          id="busca"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Explorar coleções"
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent text-15 font-bold outline-none placeholder:text-subtle"
        />
      </form>
      <button
        ref={filterButtonRef}
        type="button"
        onClick={onOpenFilters}
        aria-label={activeFilters ? `Filtros, ${activeFilters} ativos` : 'Filtros'}
        className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#b87a45_0%,#d28a4c_100%)] text-primary-foreground"
      >
        <Filters className="size-[22px]" aria-hidden />
        {activeFilters ? (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-foreground text-10 font-bold text-background"
          >
            {activeFilters}
          </span>
        ) : null}
      </button>
    </div>
  )
})

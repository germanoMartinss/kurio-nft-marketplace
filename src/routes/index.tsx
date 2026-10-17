import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { Blog } from '@/features/catalog/blog'
import { CatalogResults } from '@/features/catalog/catalog-results'
import { CatalogTabs, SortSelect } from '@/features/catalog/catalog-toolbar'
import { FeaturedBanner } from '@/features/catalog/featured-banner'
import { FiltersDrawer } from '@/features/catalog/filters-drawer'
import { FiltersPanel } from '@/features/catalog/filters-panel'
import { Hero } from '@/features/catalog/hero'
import { MobileSearchBar } from '@/features/catalog/mobile-search-bar'
import { Promos } from '@/features/catalog/promos'
import { catalogQueryOptions, highlightsQueryOptions } from '@/features/catalog/queries'
import {
  selectedCategories,
  selectedNetworks,
  toCatalogQuery,
  validateCatalogSearch,
  withFilter,
  type CatalogSearch,
} from '@/features/catalog/search-params'
import { useDebouncedSearch } from '@/features/catalog/use-debounced-search'

export const Route = createFileRoute('/')({
  validateSearch: validateCatalogSearch,
  loaderDeps: ({ search }) => search,
  // Pré-carrega (sem bloquear a navegação) para o hover/foco em links que levam à home.
  loader: ({ context, deps }) => {
    void context.queryClient.prefetchQuery(catalogQueryOptions(toCatalogQuery(deps)))
    void context.queryClient.prefetchQuery(highlightsQueryOptions())
  },
  component: HomePage,
})

function HomePage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const query = useQuery(catalogQueryOptions(toCatalogQuery(search)))
  const facets = query.data?.facets
  const [filtersOpen, setFiltersOpen] = useState(false)
  const mobileSearchRef = useRef<HTMLInputElement>(null)
  const filterButtonRef = useRef<HTMLButtonElement>(null)

  // Filtros e busca entram no histórico, reiniciam a paginação e não rolam a página para o topo.
  const update = (change: Partial<CatalogSearch>) =>
    void navigate({ search: (prev) => withFilter(prev, change), resetScroll: false })
  const clearFilters = () => void navigate({ search: {}, resetScroll: false })

  const [searchDraft, setSearchDraft] = useDebouncedSearch(search.busca, (busca) =>
    update({ busca }),
  )

  // A barra de abas mobile leva a "/#busca": foca o campo de busca.
  const { hash } = useLocation()
  useEffect(() => {
    if (hash === 'busca') mobileSearchRef.current?.focus()
  }, [hash])

  const activeFilters =
    selectedCategories(search).length +
    selectedNetworks(search).length +
    (search.precoMin || search.precoMax ? 1 : 0)

  return (
    <div className="flex flex-col gap-10 pb-10 lg:gap-24 lg:pt-8">
      <div className="flex flex-col gap-4 lg:contents">
        <MobileSearchBar
          ref={mobileSearchRef}
          value={searchDraft}
          onChange={setSearchDraft}
          onOpenFilters={() => setFiltersOpen(true)}
          activeFilters={activeFilters}
          filterButtonRef={filterButtonRef}
        />
        <Hero />
      </div>

      <section
        id="catalogo"
        aria-labelledby="catalogo-titulo"
        className="container-page scroll-mt-6"
      >
        <h2 id="catalogo-titulo" className="sr-only">
          Catálogo de NFTs
        </h2>
        <div className="flex gap-12">
          <aside aria-label="Filtros" className="hidden w-[310px] shrink-0 flex-col gap-6 lg:flex">
            <div className="bg-card p-5">
              <FiltersPanel search={search} facets={facets} onChange={update} />
            </div>
            <FeaturedBanner />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CatalogTabs value={search.aba ?? 'todos'} onChange={(aba) => update({ aba })} />
              {/* No mobile a ordenação fica no drawer de filtros (o frame mobile não tem essa linha). */}
              <div className="hidden lg:block">
                <SortSelect
                  value={search.ordem ?? 'recentes'}
                  onChange={(ordem) => update({ ordem })}
                />
              </div>
            </div>
            {search.busca ? (
              <p className="text-14 text-muted-foreground">
                Resultados para <strong className="text-foreground">“{search.busca}”</strong>{' '}
                <button
                  type="button"
                  onClick={() => update({ busca: undefined })}
                  className="ml-2 text-accent-text underline"
                >
                  limpar busca
                </button>
              </p>
            ) : null}
            <CatalogResults query={query} onClearFilters={clearFilters} />
          </div>
        </div>
      </section>

      <Promos />
      <Blog />

      <FiltersDrawer
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        search={search}
        facets={facets}
        total={query.data?.total}
        onChange={update}
        onClear={clearFilters}
        returnFocusRef={filterButtonRef}
      />
    </div>
  )
}

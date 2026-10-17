import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/features/catalog/home-page'
import { catalogQueryOptions, highlightsQueryOptions } from '@/features/catalog/queries'
import {
  toCatalogQuery,
  validateCatalogSearch,
  withFilter,
  type CatalogSearch,
} from '@/features/catalog/search-params'

export const Route = createFileRoute('/')({
  validateSearch: validateCatalogSearch,
  loaderDeps: ({ search }) => search,
  // Pré-carrega (sem bloquear a navegação) para o hover/foco em links que levam à home.
  loader: ({ context, deps }) => {
    void context.queryClient.prefetchQuery(catalogQueryOptions(toCatalogQuery(deps)))
    void context.queryClient.prefetchQuery(highlightsQueryOptions())
  },
  component: IndexRoute,
})

function IndexRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  // Filtros e busca entram no histórico, reiniciam a paginação e não rolam a página para o topo.
  const update = (change: Partial<CatalogSearch>) =>
    void navigate({ search: (prev) => withFilter(prev, change), resetScroll: false })
  return (
    <HomePage
      search={search}
      onChange={update}
      onClear={() => void navigate({ search: {}, resetScroll: false })}
    />
  )
}

import { Link } from '@tanstack/react-router'

import { ChevronLeft, ChevronRight } from '@/components/icons'
import { cn } from '@/lib/utils'

import type { CatalogSearch } from './search-params'

const itemClass =
  'flex size-[35px] items-center justify-center rounded-sm border border-border text-18 leading-4 transition-colors hover:border-primary hover:text-accent-text'

/** Paginação por links: cada página tem URL própria, entra no histórico e abre em nova aba. */
export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const to = (target: number) => (prev: CatalogSearch) => ({
    ...prev,
    pagina: target > 1 ? target : undefined,
  })

  return (
    <nav aria-label="Paginação do catálogo" className="flex justify-end">
      <ul className="flex flex-wrap gap-2">
        {page > 1 ? (
          <li>
            <Link
              to="/"
              search={to(page - 1)}
              hash="catalogo"
              className={itemClass}
              aria-label="Página anterior"
            >
              <ChevronLeft className="size-[18px]" />
            </Link>
          </li>
        ) : null}
        {pages.map((target) => (
          <li key={target}>
            <Link
              to="/"
              search={to(target)}
              hash="catalogo"
              aria-label={`Página ${target}`}
              aria-current={target === page ? 'page' : undefined}
              className={cn(
                itemClass,
                target === page &&
                  'border-primary bg-primary text-primary-foreground hover:text-primary-foreground',
              )}
            >
              {target}
            </Link>
          </li>
        ))}
        {page < totalPages ? (
          <li>
            <Link
              to="/"
              search={to(page + 1)}
              hash="catalogo"
              className={itemClass}
              aria-label="Próxima página"
            >
              <ChevronRight className="size-[18px]" />
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

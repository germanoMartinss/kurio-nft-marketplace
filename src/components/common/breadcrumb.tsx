import { Link } from '@tanstack/react-router'

/** Trilha "Início / Mercado [/ página atual]" das telas do fluxo de compra. */
export function Breadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex gap-2 text-15 leading-4 font-bold">
        <li>
          <Link to="/" className="hover:text-accent-text">
            Início
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to="/" hash="catalogo" className="hover:text-accent-text">
            Mercado
          </Link>
        </li>
        {current ? (
          <>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{current}</li>
          </>
        ) : null}
      </ol>
    </nav>
  )
}

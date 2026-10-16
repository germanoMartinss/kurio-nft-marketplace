import { Link, useRouterState } from '@tanstack/react-router'

import { UnavailableAction } from '@/components/common/unavailable-action'
import { Cart, Search, SignIn } from '@/components/icons'
import { cn } from '@/lib/utils'

import { isMarketPath } from './navigation'

const navItemClass =
  'text-16 text-foreground hover:text-accent-text -mb-px inline-flex h-full items-center border-b-[3px] border-transparent pt-1 transition-colors'
const navItemActiveClass = 'border-primary text-accent-text font-bold'

export function SiteHeader({ cartCount }: { cartCount?: number }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isMarket = isMarketPath(pathname)

  return (
    <header className="container-page hidden pt-5 lg:block">
      <div
        className={cn(
          'flex h-12 items-stretch justify-between',
          !isMarket && 'border-b border-primary/40',
        )}
      >
        <Link
          to="/"
          className="flex items-center text-14 font-bold tracking-brand"
          aria-label="Kurio, página inicial"
        >
          KURIO
        </Link>

        <nav aria-label="Principal" className="flex items-stretch gap-9">
          <Link
            to="/"
            activeOptions={{ exact: true, includeHash: false }}
            className={cn(navItemClass, !isMarket && navItemActiveClass)}
          >
            Início
          </Link>
          <Link
            to="/"
            hash="catalogo"
            // Links de âncora só ficam "ativos" com o mesmo hash; sem isso o router os marca
            // como página atual em "/". Nas telas de compra, "Mercado" é a seção atual.
            activeOptions={{ includeHash: true }}
            className={cn(navItemClass, isMarket && navItemActiveClass)}
            aria-current={isMarket ? 'true' : undefined}
          >
            Mercado
          </Link>
          <UnavailableAction feature="Criadores" className={navItemClass}>
            Criadores
          </UnavailableAction>
          <UnavailableAction feature="Aprenda" className={navItemClass}>
            Aprenda
          </UnavailableAction>
        </nav>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            hash="busca"
            activeOptions={{ includeHash: true }}
            aria-label="Buscar NFTs"
            className="transition-colors hover:text-accent-text"
          >
            <Search className="size-6" />
          </Link>
          <CartLink count={cartCount} />
          <Link
            to="/entrar"
            className="flex h-[34px] items-center gap-1.5 rounded-md bg-primary px-2.5 text-16 font-medium text-primary-foreground hover:brightness-110"
          >
            <SignIn className="size-5" />
            Entrar
          </Link>
        </div>
      </div>
    </header>
  )
}

export function CartLink({ count, className }: { count?: number; className?: string }) {
  const label = count ? `Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}` : 'Carrinho'
  return (
    <Link
      to="/carrinho"
      aria-label={label}
      className={cn('relative transition-colors hover:text-accent-text', className)}
    >
      <Cart className="size-6" />
      {count ? (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-10 font-medium text-primary-foreground"
        >
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </Link>
  )
}

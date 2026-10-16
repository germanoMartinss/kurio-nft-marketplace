import { Link } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { Cart, Heart, Home, Scan, User } from '@/components/icons'
import { cn } from '@/lib/utils'

const itemClass =
  'text-foreground data-[status=active]:text-accent-text relative flex size-12 items-center justify-center transition-colors'

/**
 * Navegação inferior das telas mobile e tablet (abaixo de 1024px), conforme o frame "Início" mobile.
 * O botão central em destaque leva à busca do catálogo.
 */
export function MobileTabBar({ cartCount }: { cartCount?: number }) {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="relative grid h-[72px] grid-cols-5 items-center rounded-t-[28px] bg-card px-4">
        <Link to="/" activeOptions={{ exact: true, includeHash: false }} className={itemClass}>
          <TabIcon Icon={Home} label="Início" />
        </Link>
        <Link to="/perfil/favoritos" className={itemClass}>
          <TabIcon Icon={Heart} label="Lista de interesse" />
        </Link>
        <div className="flex justify-center">
          <Link
            to="/"
            hash="busca"
            activeOptions={{ includeHash: true }}
            aria-label="Explorar coleções"
            className="absolute -top-7 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background"
          >
            <Scan className="size-7" />
          </Link>
        </div>
        <Link to="/carrinho" className={itemClass}>
          <TabIcon
            Icon={Cart}
            label={
              cartCount
                ? `Carrinho, ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`
                : 'Carrinho'
            }
          />
          {cartCount ? (
            <span
              aria-hidden="true"
              className="absolute top-1.5 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-10 font-medium text-primary-foreground"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          ) : null}
        </Link>
        <Link to="/perfil" className={itemClass}>
          <TabIcon Icon={User} label="Perfil" />
        </Link>
      </div>
    </nav>
  )
}

function TabIcon({
  Icon,
  label,
}: {
  Icon: (props: ComponentProps<typeof Home>) => React.ReactNode
  label: string
}) {
  return (
    <>
      <Icon className={cn('size-6')} weight="fill" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  )
}

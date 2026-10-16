import { Link } from '@tanstack/react-router'
import type { ComponentType, SVGProps } from 'react'

import { CartFilled, HeartFilled, HomeFilled, Scan, UserFilled } from '@/components/icons'

const itemClass =
  'relative flex size-12 items-center justify-center justify-self-center text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-accent-text'

/**
 * Navegação inferior das telas mobile e tablet (abaixo de 1024px), conforme o frame "Início"
 * mobile: barra com cantos arredondados, recorte central e botão em destaque que leva à busca.
 */
export function MobileTabBar({ cartCount }: { cartCount?: number }) {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 h-[88px] lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Fundo da barra: duas partes flexíveis e um recorte central de largura fixa, para que a
          curva do recorte não se deforme entre 390 e 1023px. */}
      <div aria-hidden="true" className="absolute inset-0 flex text-card">
        <div className="flex-1 rounded-tl-[32px] bg-card" />
        <svg viewBox="0 0 140 88" className="h-full w-[140px] shrink-0" preserveAspectRatio="none">
          <path d="M0 0H12C30 0 28 46 70 46C112 46 110 0 128 0H140V88H0Z" fill="currentColor" />
        </svg>
        <div className="flex-1 rounded-tr-[32px] bg-card" />
      </div>
      <div className="relative grid h-[88px] grid-cols-[1fr_1fr_1.4fr_1fr_1fr] items-center px-3 pt-2">
        <Link to="/" activeOptions={{ exact: true, includeHash: false }} className={itemClass}>
          <TabIcon Icon={HomeFilled} label="Início" />
        </Link>
        <Link to="/perfil/favoritos" className={itemClass}>
          <TabIcon Icon={HeartFilled} label="Lista de interesse" />
        </Link>
        <span aria-hidden="true" />
        <Link to="/carrinho" className={itemClass}>
          <TabIcon
            Icon={CartFilled}
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
          <TabIcon Icon={UserFilled} label="Perfil" />
        </Link>
      </div>
      <Link
        to="/"
        hash="busca"
        activeOptions={{ includeHash: true }}
        aria-label="Explorar coleções"
        className="absolute top-0 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgb(210_138_76/0.94)_0%,rgb(184_122_69/0.94)_100%)] text-foreground shadow-card"
      >
        <Scan className="size-7" />
      </Link>
    </nav>
  )
}

function TabIcon({ Icon, label }: { Icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }) {
  return (
    <>
      <Icon className="size-[22px]" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  )
}

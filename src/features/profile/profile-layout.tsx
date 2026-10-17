import { Link } from '@tanstack/react-router'
import type { ComponentType, ReactNode, SVGProps } from 'react'

import { UnavailableAction } from '@/components/common/unavailable-action'
import {
  Activity,
  Download,
  Heart,
  Offers,
  SignOut,
  Support,
  User,
  Wallet,
} from '@/components/icons'
import { MobileTopBar } from '@/components/layout/mobile-top-bar'
import { useLogout } from '@/features/auth/use-auth'
import { cn } from '@/lib/utils'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

const itemClass =
  'flex h-[45px] items-center gap-3 border-l-[6px] border-transparent pl-3 text-16 text-accent-text transition-colors hover:bg-primary/10 data-[status=active]:border-primary data-[status=active]:bg-primary/10'

/**
 * Estrutura das telas "Meu perfil": coluna lateral no desktop (Figma) e, no mobile, o título no
 * topo com abas em pílula (o Figma não traz frame mobile; segue o padrão das demais telas).
 * Seções fora do escopo (atividade, ofertas, arquivos, suporte) são anunciadas como indisponíveis.
 */
export function ProfileLayout({
  title,
  hideTitleOnDesktop = false,
  children,
}: {
  title: string
  /** O Figma de carteiras começa direto na seção; o título fica só para leitores de tela. */
  hideTitleOnDesktop?: boolean
  children: ReactNode
}) {
  const logout = useLogout()
  const unavailable: [string, Icon][] = [
    ['Atividade', Activity],
    ['Ofertas', Offers],
    ['Arquivos baixados', Download],
    ['Suporte', Support],
  ]
  return (
    <div className="pb-10">
      <MobileTopBar title="Meu perfil" fallbackTo="/" />
      <div className="container-page flex flex-col gap-6 max-lg:px-6 lg:flex-row lg:gap-7 lg:pt-8">
        <nav
          aria-label="Meu perfil"
          className="hidden h-fit w-[310px] shrink-0 bg-card pt-3 lg:block"
        >
          <p className="px-2.5 pb-1.5 text-18 font-bold">Meu perfil</p>
          <ul>
            <li>
              <Link to="/perfil" activeOptions={{ exact: true }} className={itemClass}>
                <User className="size-[18px]" aria-hidden="true" />
                Dados do perfil
              </Link>
            </li>
            <li>
              <Link to="/perfil/carteiras" className={itemClass}>
                <Wallet className="size-[18px]" aria-hidden="true" />
                Carteiras
              </Link>
            </li>
            {unavailable.slice(0, 1).map(([name, Icon]) => (
              <li key={name}>
                <UnavailableAction feature={name} className={cn(itemClass, 'w-full')}>
                  <Icon className="size-[18px]" aria-hidden="true" />
                  {name}
                </UnavailableAction>
              </li>
            ))}
            <li>
              <Link to="/perfil/favoritos" className={itemClass}>
                <Heart className="size-[18px]" aria-hidden="true" />
                Lista de interesse
              </Link>
            </li>
            {unavailable.slice(1).map(([name, Icon]) => (
              <li key={name}>
                <UnavailableAction feature={name} className={cn(itemClass, 'w-full')}>
                  <Icon className="size-[18px]" aria-hidden="true" />
                  {name}
                </UnavailableAction>
              </li>
            ))}
            <li className="mt-1 border-t border-border">
              <button
                type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className={cn(itemClass, 'w-full font-bold')}
              >
                <SignOut className="size-[18px]" aria-hidden="true" />
                Sair
              </button>
            </li>
          </ul>
        </nav>

        <nav aria-label="Seções do perfil" className="flex gap-2 overflow-x-auto lg:hidden">
          {[
            ['/perfil', 'Dados do perfil'],
            ['/perfil/carteiras', 'Carteiras'],
            ['/perfil/favoritos', 'Lista de interesse'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className="shrink-0 rounded-full border border-border-soft px-4 py-2 text-14 text-muted-foreground data-[status=active]:border-primary data-[status=active]:bg-primary data-[status=active]:font-bold data-[status=active]:text-primary-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <section
          className="min-w-0 flex-1"
          aria-labelledby="perfil-titulo"
          data-testid="profile-section"
        >
          <h1 className="sr-only max-lg:hidden">Meu perfil</h1>
          <h2
            id="perfil-titulo"
            className={cn('mb-5 text-18 font-bold lg:mb-6', hideTitleOnDesktop && 'lg:sr-only')}
          >
            {title}
          </h2>
          {children}
          <div className="mt-10 flex lg:hidden">
            <button
              type="button"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-primary text-16 font-bold text-accent-text"
            >
              <SignOut className="size-5" aria-hidden="true" />
              Sair da conta
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

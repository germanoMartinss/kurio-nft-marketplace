import type { ReactNode } from 'react'

import { MobileTabBar } from './mobile-tab-bar'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

const MAIN_CONTENT_ID = 'conteudo'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-14 font-bold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
      {/* Espaço para a barra de abas fixa no mobile, para não cobrir o fim da página. */}
      <div aria-hidden="true" className="h-24 lg:hidden" />
      <MobileTabBar />
    </div>
  )
}

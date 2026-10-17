import { useCanGoBack, useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { ChevronLeft } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * Topo das telas mobile (o mobile não tem header global): botão de voltar circular, título
 * centralizado e uma ação opcional à direita, como nos frames de carrinho, pagamento e detalhe.
 * Visível só abaixo de 1024px.
 */
export function MobileTopBar({
  title,
  action,
  fallbackTo = '/',
  className,
}: {
  title?: string
  action?: ReactNode
  /** Destino do "voltar" quando a tela foi aberta por acesso direto (sem histórico). */
  fallbackTo?: string
  className?: string
}) {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div className={cn('flex h-16 items-center gap-3 px-6 lg:hidden', className)}>
      <button
        type="button"
        onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: fallbackTo }))}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-soft bg-surface-raised text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Voltar</span>
      </button>
      {title ? (
        <h1 className="min-w-0 flex-1 text-center text-18 leading-6 font-bold sm:text-20">
          {title}
        </h1>
      ) : (
        <span className="flex-1" />
      )}
      <div className="flex size-9 shrink-0 items-center justify-center">{action}</div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

/**
 * Ação fora do escopo da entrega (páginas editoriais, suporte, ofertas, login social etc.).
 * O enunciado exige comportamento coerente sem aparentar sucesso: o elemento é anunciado como
 * indisponível e, ao ser acionado, explica o motivo em vez de navegar ou simular um resultado.
 */
export function UnavailableAction({
  children,
  feature,
  className,
}: {
  children: ReactNode
  /** Nome da funcionalidade, usado na mensagem. Ex.: "Central de ajuda". */
  feature: string
  className?: string
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      className={cn('cursor-not-allowed text-left', className)}
      onClick={() =>
        toast.info(`${feature} indisponível`, {
          description: 'Esta seção não faz parte da demonstração do Kurio.',
        })
      }
    >
      {children}
      <span className="sr-only"> (indisponível nesta demonstração)</span>
    </button>
  )
}

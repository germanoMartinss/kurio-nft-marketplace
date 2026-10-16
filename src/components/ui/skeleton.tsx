import { cn } from '@/lib/utils'

/**
 * Bloco de carregamento com shimmer. Deve receber as mesmas dimensões do conteúdo final para não
 * causar deslocamento de layout. Com `prefers-reduced-motion`, o brilho fica estático.
 * É decorativo: o estado de carregamento é anunciado pelo contêiner (`aria-busy`).
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        'animate-shimmer rounded-sm bg-[linear-gradient(90deg,var(--card)_25%,var(--surface-raised)_50%,var(--card)_75%)] bg-size-[200%_100%] motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Botões do Figma: primário laranja com texto escuro (raio 6px), contorno laranja ("Favoritar"),
 * link em cor de destaque ("Continuar explorando"), neutro com borda ("Continuar com Google") e
 * pílula com gradiente nas telas mobile ("Comprar NFT", "Conectar e finalizar").
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-bold whitespace-nowrap transition-[color,background-color,border-color,opacity,filter] outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground rounded-md hover:brightness-110',
        outline:
          'border-primary text-accent-text hover:bg-primary/10 rounded-md border bg-transparent',
        neutral:
          'border-border text-muted-foreground hover:border-border-soft hover:text-foreground rounded-xs border bg-transparent font-medium',
        ghost: 'text-accent-text hover:text-primary rounded-md bg-transparent font-medium',
        link: 'text-accent-text hover:text-primary h-auto rounded-xs bg-transparent px-0 font-medium underline-offset-4 hover:underline',
        pill: 'text-primary-foreground rounded-2xl bg-[linear-gradient(100deg,#d28a4c_0%,#b87a45_100%)] hover:brightness-110',
        icon: 'bg-surface-raised text-foreground hover:text-accent-text rounded-full',
      },
      size: {
        sm: 'h-8 px-3 text-14',
        md: 'h-10 px-6 text-16',
        lg: 'h-11 px-6 text-16',
        xl: 'h-14 px-8 text-16',
        icon: 'size-10',
        'icon-sm': 'size-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      // Sem `type`, um <button> dentro de <form> envia o formulário; o padrão aqui é "button".
      type={asChild ? type : (type ?? 'button')}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

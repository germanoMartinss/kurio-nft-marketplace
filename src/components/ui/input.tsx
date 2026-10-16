import * as React from 'react'

import { cn } from '@/lib/utils'

/** Campo de texto do Figma: borda 1px #3F2319, raio 3px, 40px de altura, placeholder em tom areia. */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-10 w-full min-w-0 rounded-xs border border-input bg-transparent px-3 text-15 text-foreground transition-colors outline-none placeholder:text-subtle',
        'focus-visible:border-primary focus-visible:outline-none',
        'aria-invalid:border-coral',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-14 file:font-medium file:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Input }

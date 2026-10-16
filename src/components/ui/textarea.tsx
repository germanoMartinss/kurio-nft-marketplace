import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'min-h-36 w-full rounded-xs border border-input bg-transparent px-3 py-2 text-15 text-foreground transition-colors outline-none placeholder:text-subtle',
        'focus-visible:border-primary focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-coral',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }

import { UnavailableAction } from '@/components/common/unavailable-action'
import { FacebookLogo, GoogleLogo } from '@/components/icons'
import { cn } from '@/lib/utils'

import type { AuthVariant } from './form-fields'

/** Login social está fora do escopo: os botões existem (layout) mas se declaram indisponíveis. */
export function SocialButtons({ variant }: { variant: AuthVariant }) {
  const buttonClass = cn(
    'flex h-10 w-full items-center justify-center gap-2 border border-border text-13 font-medium text-muted-foreground hover:border-border-soft hover:text-foreground',
    'rounded-xs',
  )
  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 h-px bg-border',
            variant === 'dialog' ? '-inset-x-20' : 'inset-x-0',
          )}
        />
        <span
          className={cn(
            'relative px-3 text-12 text-foreground',
            variant === 'dialog' ? 'bg-card' : 'bg-background',
          )}
        >
          Ou continue com
        </span>
      </div>
      <UnavailableAction feature="Login com Google" className={buttonClass}>
        <GoogleLogo className="size-5" aria-hidden="true" />
        Continuar com Google
      </UnavailableAction>
      <UnavailableAction feature="Login com Facebook" className={buttonClass}>
        <FacebookLogo className="size-5" aria-hidden="true" />
        Continuar com Facebook
      </UnavailableAction>
    </div>
  )
}

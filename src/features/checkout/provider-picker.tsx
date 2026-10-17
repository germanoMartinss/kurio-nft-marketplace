import { useId } from 'react'

import { WalletApp } from '@/components/icons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { WALLET_PROVIDER_LABELS, type WalletProvider } from '@/contracts/wallet'
import { cn } from '@/lib/utils'

const ORDER: WalletProvider[] = ['walletconnect', 'metamask', 'coinbase']
const BADGE: Partial<Record<WalletProvider, string>> = { walletconnect: 'W', metamask: 'M' }

/** "Carteira e rede": aplicativo de carteira usado no pagamento (caixas no desktop, cartões no mobile). */
export function ProviderPicker({
  value,
  onChange,
  className,
}: {
  value: WalletProvider | null
  onChange: (provider: WalletProvider) => void
  className?: string
}) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className={cn('flex flex-col gap-3', className)}>
      <h2 id={titleId} className="text-16 font-bold lg:text-center lg:text-17">
        Carteira e rede
      </h2>
      <RadioGroup
        value={value ?? ''}
        onValueChange={(next) => onChange(next as WalletProvider)}
        aria-labelledby={titleId}
        className="gap-3 lg:gap-4"
      >
        {ORDER.map((provider) => {
          const inputId = `${titleId}-${provider}`
          return (
            <label
              key={provider}
              htmlFor={inputId}
              className={cn(
                'flex cursor-pointer items-center gap-4 rounded-xl bg-card px-3.5 py-3.5 text-14 lg:h-[46px] lg:rounded-xs lg:border lg:border-border lg:bg-transparent lg:px-3 lg:py-0 lg:text-15',
                value === provider && 'lg:border-foreground',
              )}
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-raised text-14 font-bold text-accent-text lg:hidden"
              >
                {BADGE[provider] ?? <WalletApp className="size-5" />}
              </span>
              <span className="flex-1 lg:order-2">{WALLET_PROVIDER_LABELS[provider]}</span>
              <RadioGroupItem value={provider} id={inputId} className="lg:order-1" />
            </label>
          )
        })}
      </RadioGroup>
    </section>
  )
}

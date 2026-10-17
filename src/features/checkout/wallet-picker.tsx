import { Link } from '@tanstack/react-router'
import { useId } from 'react'

import { MoreVertical } from '@/components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { Wallet } from '@/contracts/wallet'
import { networkLabel, shortAddress } from '@/lib/format'
import { cn } from '@/lib/utils'

/**
 * Carteiras cadastradas ("Carteira conectada" do frame mobile). A seleção define rede e endereço do
 * pedido; o menu de cada carteira simula conexão e desconexão da extensão.
 */
export function WalletPicker({
  wallets,
  value,
  connectedIds,
  onChange,
  onToggleConnection,
  busy,
  className,
}: {
  wallets: Wallet[]
  value: string | null
  connectedIds: string[]
  onChange: (walletId: string) => void
  onToggleConnection: (walletId: string, connect: boolean) => void
  busy: boolean
  className?: string
}) {
  const titleId = useId()
  return (
    <section
      aria-labelledby={titleId}
      data-testid="wallet-section"
      className={cn('flex flex-col gap-3', className)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={titleId} className="text-16 font-bold">
          Carteira conectada
        </h2>
        <Link to="/perfil/carteiras" className="text-14 font-bold text-accent-text">
          Trocar carteira
        </Link>
      </div>
      <RadioGroup
        value={value ?? ''}
        onValueChange={onChange}
        aria-labelledby={titleId}
        className="gap-3"
      >
        {wallets.map((wallet) => {
          const connected = connectedIds.includes(wallet.id)
          const inputId = `${titleId}-${wallet.id}`
          return (
            <div
              key={wallet.id}
              className={cn(
                'flex items-center gap-4 rounded-xl border border-transparent bg-card px-4 py-4 lg:rounded-lg lg:border-border lg:bg-transparent',
                value === wallet.id && 'lg:border-primary',
              )}
            >
              <RadioGroupItem value={wallet.id} id={inputId} />
              <label
                htmlFor={inputId}
                className="flex min-w-0 flex-1 cursor-pointer flex-col gap-0.5"
              >
                <span className="text-16 font-bold">{wallet.nickname}</span>
                <span className="truncate text-14 text-muted-foreground">
                  {wallet.secondaryAddress && wallet.kind === 'secundaria'
                    ? wallet.secondaryAddress
                    : shortAddress(wallet.address)}
                </span>
                <span className="text-14 text-muted-foreground">
                  {wallet.kind === 'principal' ? 'Rede principal' : 'Rede'}{' '}
                  {networkLabel(wallet.network)}
                </span>
                <span
                  className={cn(
                    'text-12 font-bold',
                    connected ? 'text-accent-text' : 'text-subtle',
                  )}
                >
                  {connected ? '● Conectada' : '○ Desconectada'}
                </span>
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    disabled={busy}
                    className="flex size-8 items-center justify-center rounded-full text-subtle outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                  >
                    <MoreVertical className="size-5" aria-hidden="true" />
                    <span className="sr-only">Ações da carteira {wallet.nickname}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => onToggleConnection(wallet.id, !connected)}>
                    {connected ? 'Desconectar carteira' : 'Conectar carteira'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        })}
      </RadioGroup>
    </section>
  )
}

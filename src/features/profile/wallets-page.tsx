import { useState } from 'react'

import { ErrorState } from '@/components/common/query-states'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import type { Wallet } from '@/contracts/wallet'
import { useWallets } from '@/features/wallets/queries'

import { ProfileLayout } from './profile-layout'
import { WalletForm } from './wallet-form'

export function WalletsPage() {
  const query = useWallets()
  return (
    <ProfileLayout title="Carteiras" hideTitleOnDesktop>
      {query.isPending ? (
        <div
          aria-busy="true"
          role="status"
          aria-label="Carregando carteiras"
          className="grid gap-5 lg:grid-cols-2"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-[68px]" />
          ))}
        </div>
      ) : query.isError ? (
        <ErrorState
          title="Não foi possível carregar as carteiras"
          message="Verifique sua conexão e tente novamente."
          onRetry={() => void query.refetch()}
          retrying={query.isFetching}
        />
      ) : (
        <WalletSections wallets={query.data} />
      )}
    </ProfileLayout>
  )
}

function WalletSections({ wallets }: { wallets: Wallet[] }) {
  const principal = wallets.find((wallet) => wallet.kind === 'principal')
  const secondary = wallets.find((wallet) => wallet.kind === 'secundaria')
  const [adding, setAdding] = useState(false)
  const [sameAsPrincipal, setSameAsPrincipal] = useState(false)

  const copied =
    principal && sameAsPrincipal
      ? {
          displayName: principal.displayName,
          profileName: principal.profileName,
          network: principal.network,
          provider: principal.provider,
          referralCode: principal.referralCode,
          email: principal.email,
          ensName: principal.ensName,
        }
      : undefined

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="carteira-principal" className="flex flex-col gap-1.5">
        <h3 id="carteira-principal" className="text-18 font-bold">
          Carteira principal
        </h3>
        <p className="mb-5 text-13 text-muted-foreground">
          Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.
        </p>
        <WalletForm
          key={principal?.id ?? 'nova-principal'}
          kind="principal"
          wallet={principal}
          submitLabel="Salvar carteira"
        />
      </section>

      <section aria-labelledby="carteira-secundaria" className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="carteira-secundaria" className="text-18 font-bold">
            Carteira secundária
          </h3>
          {!secondary && !adding ? (
            <div className="flex items-center gap-4 text-14">
              {principal ? (
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    checked={sameAsPrincipal}
                    onCheckedChange={(checked) => setSameAsPrincipal(checked === true)}
                  />
                  Igual à carteira principal
                </label>
              ) : null}
              <Button
                type="button"
                variant="ghost"
                className="text-16 font-bold"
                onClick={() => setAdding(true)}
              >
                Adicionar
                <span className="sr-only"> carteira secundária</span>
              </Button>
            </div>
          ) : null}
        </div>
        {secondary ? (
          <div className="mt-4">
            <WalletForm
              key={secondary.id}
              kind="secundaria"
              wallet={secondary}
              submitLabel="Salvar carteira"
            />
          </div>
        ) : adding ? (
          <div className="mt-4">
            <WalletForm
              key={sameAsPrincipal ? 'copia' : 'vazia'}
              kind="secundaria"
              defaults={copied}
              submitLabel="Salvar carteira"
            />
          </div>
        ) : (
          <p className="text-13 text-muted-foreground">
            Você ainda não adicionou uma carteira secundária.
          </p>
        )}
      </section>
    </div>
  )
}

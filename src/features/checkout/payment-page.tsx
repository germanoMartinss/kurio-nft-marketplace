import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Breadcrumb } from '@/components/common/breadcrumb'
import { errorMessage } from '@/components/common/error-message'
import { EmptyState, ErrorState } from '@/components/common/query-states'
import { MobileTopBar } from '@/components/layout/mobile-top-bar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { buyerSchema, type Buyer } from '@/contracts/order'
import { WALLET_PROVIDER_LABELS, type Wallet, type WalletProvider } from '@/contracts/wallet'
import { useCheckoutCart } from '@/features/cart/queries'
import { useSessionUser } from '@/features/auth/session-store'
import { useWallets } from '@/features/wallets/queries'
import { NETWORK_LABELS } from '@/contracts/common'
import { formatEth } from '@/lib/money'
import { cn } from '@/lib/utils'

import { Field, NoteField, TextInput } from '@/components/common/form-fields'
import { OrderLines } from './order-lines'
import { ProviderPicker } from './provider-picker'
import { ReviewDialog } from './review-dialog'
import { Totals } from './totals'
import { useCheckout } from './use-checkout'
import { WalletPicker } from './wallet-picker'

const EMPTY_BUYER: Buyer = {
  displayName: '',
  username: '',
  profileName: '',
  email: '',
  ensName: '',
  referralCode: '',
  note: '',
}

/** Dados do colecionador sugeridos a partir da carteira escolhida e da conta. */
const suggestedBuyer = (wallet: Wallet | undefined, username: string, email: string): Buyer => ({
  ...EMPTY_BUYER,
  displayName: wallet?.displayName ?? '',
  username,
  profileName: wallet?.profileName ?? '',
  email: wallet?.email ?? email,
  ensName: wallet?.ensName ?? '',
  referralCode: wallet?.referralCode ?? '',
})

export function PaymentPage() {
  const user = useSessionUser()
  if (!user) return null
  // `key` por usuário: o rascunho e o estado do checkout nunca atravessam uma troca de sessão.
  return (
    <PaymentScreen key={user.id} userId={user.id} username={user.username} email={user.email} />
  )
}

function PaymentScreen({
  userId,
  username,
  email,
}: {
  userId: string
  username: string
  email: string
}) {
  const wallets = useWallets()
  const checkout = useCheckout(userId)
  const { draft, setDraft } = checkout

  // A secundária vem primeiro, como no frame mobile ("Reserva" selecionada por padrão).
  const list = [...(wallets.data ?? [])].sort((a, b) =>
    a.kind === b.kind ? 0 : a.kind === 'secundaria' ? -1 : 1,
  )
  const wallet = list.find((item) => item.id === draft.walletId) ?? list[0]
  const provider: WalletProvider | null = draft.provider ?? wallet?.provider ?? null
  const network = wallet?.network ?? 'ethereum'
  const cartQuery = useCheckoutCart(network)
  const cart = cartQuery.data

  const form = useForm<Buyer>({
    resolver: standardSchemaResolver(buyerSchema),
    defaultValues: { ...suggestedBuyer(undefined, username, email), ...draft.form },
  })
  const { register, handleSubmit, reset, getValues, subscribe, formState } = form
  const { errors } = formState

  // O que foi digitado fica no rascunho (preservado se a sessão expirar).
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => setDraft((previous) => ({ ...previous, form: values })),
      }),
    [subscribe, setDraft],
  )

  // Ao carregar as carteiras (ou trocar a escolhida), os campos da carteira são sugeridos de novo.
  const suggestedFor = useRef<string | null>(null)
  useEffect(() => {
    if (!wallet || suggestedFor.current === wallet.id) return
    const first = suggestedFor.current === null
    suggestedFor.current = wallet.id
    if (first && draft.form.displayName) return // rascunho existente prevalece
    reset({ ...suggestedBuyer(wallet, username, email), note: getValues('note') })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.id])

  const unavailable = cart?.items.some((item) => item.notices.includes('indisponivel')) ?? false

  const onSubmit = handleSubmit((buyer) => {
    if (!wallet || !provider) return
    checkout.requestQuote({ buyer, wallet, provider })
  })

  if (wallets.isError || (cartQuery.isError && !cart)) {
    return (
      <div className="container-page py-16">
        <ErrorState
          title="Não foi possível carregar o pagamento"
          message={errorMessage(wallets.error ?? cartQuery.error)}
          onRetry={() => {
            void wallets.refetch()
            void cartQuery.refetch()
          }}
        />
      </div>
    )
  }
  if (cart && cart.items.length === 0 && !checkout.attempt) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Seu carrinho está vazio"
          message="Adicione NFTs ao carrinho para finalizar uma compra."
          action={
            <Link to="/" hash="catalogo" className={buttonVariants({ variant: 'primary' })}>
              Explorar o mercado
            </Link>
          }
        />
      </div>
    )
  }
  if (wallets.data && list.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Cadastre uma carteira para pagar"
          message="O pagamento usa uma carteira cadastrada na sua conta, com a rede do pedido."
          action={
            <Link to="/perfil/carteiras" className={buttonVariants({ variant: 'primary' })}>
              Cadastrar carteira
            </Link>
          }
        />
      </div>
    )
  }

  const loading = !cart || !wallet
  const canConfirm = !loading && !unavailable && !checkout.quotePending

  const confirmButton = (mobile: boolean) => (
    <Button
      type="submit"
      form="form-pagamento"
      variant={mobile ? 'pill' : 'primary'}
      disabled={!canConfirm}
      aria-busy={checkout.quotePending}
      className={cn('w-full', mobile ? 'h-[60px] rounded-full text-15' : 'h-[45px] text-15')}
    >
      {checkout.quotePending ? 'Cotando…' : 'Confirmar compra'}
    </Button>
  )

  return (
    <div className="flex min-h-dvh flex-col pb-10 lg:min-h-0">
      <MobileTopBar title="Pagamento com carteira" fallbackTo="/carrinho" />
      <div className="container-page flex flex-1 flex-col gap-5 max-lg:px-6 lg:gap-6 lg:pt-8">
        <div className="hidden lg:block">
          <Breadcrumb current="Pagamento" />
        </div>
        <h1 className="sr-only max-lg:hidden">Pagamento</h1>
        {unavailable ? (
          <p role="alert" className="rounded-lg border border-coral/60 p-3 text-14 text-coral">
            Há itens esgotados no carrinho.{' '}
            <Link to="/carrinho" className="underline">
              Volte ao carrinho
            </Link>{' '}
            para removê-los antes de pagar.
          </p>
        ) : null}

        <div className="flex flex-1 flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_405px] lg:items-start lg:gap-x-10 xl:gap-x-[32px]">
          <div className="max-lg:contents lg:flex lg:flex-col lg:gap-5">
            {wallet ? (
              <WalletPicker
                wallets={list}
                value={wallet.id}
                connectedIds={draft.connectedWalletIds}
                busy={checkout.toggleConnection.isPending}
                onChange={(walletId) =>
                  setDraft((previous) => ({
                    ...previous,
                    walletId,
                    provider: list.find((item) => item.id === walletId)?.provider ?? null,
                  }))
                }
                onToggleConnection={(walletId, connect) =>
                  checkout.toggleConnection.mutate({ walletId, connect })
                }
                className="max-lg:order-1 lg:order-2"
              />
            ) : (
              <Skeleton
                data-testid="wallet-section"
                className="h-[280px] max-lg:order-1 lg:order-2"
              />
            )}

            <section
              aria-labelledby="dados-colecionador"
              className="flex flex-col gap-5 max-lg:order-4 lg:order-1 lg:gap-5"
            >
              <h2 id="dados-colecionador" className="text-16 font-bold lg:text-18">
                Perfil do colecionador
              </h2>
              <form
                id="form-pagamento"
                onSubmit={onSubmit}
                noValidate
                aria-label="Dados do colecionador"
                className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-5 lg:grid-cols-2"
              >
                <TextInput
                  label="Nome de exibição"
                  required
                  autoComplete="name"
                  error={errors.displayName}
                  registration={register('displayName')}
                />
                <TextInput
                  label="Nome de usuário"
                  required
                  autoComplete="username"
                  error={errors.username}
                  registration={register('username')}
                />
                <Field label="Rede" required>
                  {(aria) => (
                    <input
                      {...aria}
                      readOnly
                      value={wallet ? NETWORK_LABELS[wallet.network] : ''}
                      placeholder="Selecione uma rede"
                      className="h-10 rounded-xs border border-input bg-transparent px-3 text-15 text-muted-foreground"
                    />
                  )}
                </Field>
                <TextInput
                  label="Nome do perfil"
                  required
                  error={errors.profileName}
                  registration={register('profileName')}
                />
                <Field label="Endereço da carteira" required>
                  {(aria) => (
                    <input
                      {...aria}
                      readOnly
                      value={wallet?.address ?? ''}
                      placeholder="Endereço 0x da carteira"
                      className="h-10 min-w-0 rounded-xs border border-input bg-transparent px-3 text-15 text-muted-foreground"
                    />
                  )}
                </Field>
                <Field label="ENS ou carteira secundária (opcional)">
                  {(aria) => (
                    <input
                      {...aria}
                      readOnly
                      value={wallet?.secondaryAddress ?? ''}
                      placeholder="ENS ou carteira secundária (opcional)"
                      className="h-10 min-w-0 rounded-xs border border-input bg-transparent px-3 text-15 text-muted-foreground"
                    />
                  )}
                </Field>
                <Field label="Tipo de carteira" required>
                  {(aria) => (
                    <select
                      {...aria}
                      value={provider ?? ''}
                      onChange={(event) =>
                        setDraft((previous) => ({
                          ...previous,
                          provider: event.target.value as WalletProvider,
                        }))
                      }
                      className="h-10 rounded-xs border border-input bg-background px-3 text-15"
                    >
                      <option value="" disabled>
                        Selecione uma carteira
                      </option>
                      {Object.entries(WALLET_PROVIDER_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <TextInput
                  label="Código de indicação"
                  required
                  error={errors.referralCode}
                  registration={register('referralCode')}
                />
                <TextInput
                  label="E-mail"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  error={errors.email}
                  registration={register('email')}
                />
                <TextInput
                  label="Nome ENS (sem .eth)"
                  required
                  placeholder=".eth"
                  error={errors.ensName}
                  registration={register('ensName')}
                />
                <div className="lg:col-span-2">
                  <NoteField registration={register('note')} error={errors.note} />
                </div>
              </form>
            </section>
          </div>

          <div className="max-lg:contents lg:flex lg:flex-col lg:gap-5">
            <section
              aria-labelledby="seus-nfts"
              data-testid="items-section"
              className="flex flex-col gap-3 max-lg:order-3 lg:gap-3"
            >
              <h2 id="seus-nfts" className="sr-only text-16 font-bold lg:not-sr-only">
                Seus NFTs
              </h2>
              {cart ? (
                <>
                  <div className="hidden lg:block">
                    <OrderLines
                      lines={cart.items.map((item) => ({
                        ...item,
                        key: item.id,
                        lineTotal: item.lineTotal,
                      }))}
                    />
                  </div>
                  <p className="hidden text-center text-14 lg:block">
                    Tem um código promocional?{' '}
                    <Link to="/carrinho" className="text-accent-text underline">
                      Aplique aqui
                    </Link>
                  </p>
                  <div className="hidden lg:block">
                    <Totals {...cart.summary} testId="checkout-total" />
                  </div>
                  <p className="flex items-baseline justify-end gap-7 lg:hidden">
                    <span className="text-16 font-bold">Total:</span>
                    <span
                      className="text-18 font-bold text-accent-text"
                      data-testid="checkout-total"
                    >
                      {formatEth(cart.summary.total)}
                    </span>
                  </p>
                </>
              ) : (
                <Skeleton className="h-[26px] lg:h-[267px]" />
              )}
            </section>
            <ProviderPicker
              value={provider}
              onChange={(next) => setDraft((previous) => ({ ...previous, provider: next }))}
              className="max-lg:order-2"
            />
            <div className="hidden lg:block">{confirmButton(false)}</div>
          </div>
        </div>

        <div className="max-lg:sticky max-lg:bottom-0 max-lg:order-last max-lg:-mx-6 max-lg:bg-background max-lg:px-6 max-lg:pt-3 max-lg:pb-6 lg:hidden">
          {confirmButton(true)}
        </div>
      </div>

      {checkout.reviewing && checkout.attempt ? (
        <ReviewDialog checkout={checkout} attempt={checkout.attempt} cart={cart} wallet={wallet} />
      ) : null}
    </div>
  )
}

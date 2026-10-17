import { Link } from '@tanstack/react-router'
import { useId, useState, type FormEvent } from 'react'
import * as z from 'zod/mini'

import { WarningCircle } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { couponApplySchema, type Cart } from '@/contracts/cart'
import { ApiRequestError } from '@/api/errors'
import { eth, formatEth } from '@/lib/money'
import { cn } from '@/lib/utils'

import type { useCartActions } from './queries'

type Variant = 'desktop' | 'mobile'
type Actions = ReturnType<typeof useCartActions>

/** O Figma mostra o desconto zerado como "(-) 00.00", sem unidade. */
const formatDiscount = (discount: string) =>
  `(-) ${eth(discount).eq(0) ? '00.00' : formatEth(discount, { unit: false })}`

function CouponForm({
  cart,
  actions,
  variant,
}: {
  cart: Cart
  actions: Actions
  variant: Variant
}) {
  const [code, setCode] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const id = useId()
  const errorId = `${id}-erro`
  const applied = cart.summary.coupon

  const apiError =
    actions.applyCode.error instanceof ApiRequestError
      ? (actions.applyCode.error.fieldErrors.code ?? actions.applyCode.error.message)
      : actions.applyCode.error
        ? 'Não foi possível aplicar o código. Tente novamente.'
        : null
  const error = localError ?? apiError

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const parsed = z.safeParse(couponApplySchema, { code })
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0]?.message ?? 'Informe o código promocional.')
      return
    }
    setLocalError(null)
    actions.applyCode.mutate(parsed.data.code, { onSuccess: () => setCode('') })
  }

  const mobile = variant === 'mobile'
  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={submit}
        noValidate
        aria-label="Código promocional"
        className="flex flex-col gap-2"
      >
        <label htmlFor={id} className={cn('text-14 font-bold', mobile && 'sr-only')}>
          Código promocional
        </label>
        <div
          className={cn(
            'flex overflow-hidden border',
            mobile
              ? 'h-[50px] rounded-full border-border bg-surface-raised/40'
              : 'h-10 rounded-xs border-primary',
            error && 'border-coral',
          )}
        >
          <input
            id={id}
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setLocalError(null)
              actions.applyCode.reset()
            }}
            autoComplete="off"
            placeholder="Digite o código promocional..."
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'min-w-0 flex-1 bg-transparent text-12 text-foreground outline-none placeholder:text-subtle focus-visible:bg-primary/5',
              mobile ? 'px-4 text-13' : 'px-3',
            )}
          />
          <button
            type="submit"
            disabled={actions.busy}
            className={cn(
              'shrink-0 px-5 text-14 font-bold text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-60',
              mobile
                ? 'rounded-full bg-[linear-gradient(100deg,#d28a4c_0%,#b87a45_100%)] px-6'
                : 'bg-primary',
            )}
          >
            Aplicar
          </button>
        </div>
        {error ? (
          <p id={errorId} role="alert" className="flex items-start gap-1.5 text-13 text-coral">
            <WarningCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : null}
      </form>
      {applied ? (
        <div className="flex items-center justify-between gap-3 rounded-xs border border-border bg-surface-raised/40 px-3 py-2 text-13">
          <p>
            <span className="font-bold text-accent-text">{applied.code}</span> aplicado
            <span className="block text-muted-foreground">{applied.description}</span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            disabled={actions.busy}
            onClick={() => actions.removeCode.mutate()}
          >
            Remover
            <span className="sr-only"> cupom {applied.code}</span>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function SummaryRows({ cart }: { cart: Cart }) {
  const { summary } = cart
  const row = 'flex items-baseline justify-between gap-4'
  return (
    <dl className="flex flex-col gap-2.5 text-15 lg:gap-3 lg:text-16">
      <div className={row}>
        <dt>Subtotal</dt>
        <dd className="text-16 lg:text-18">{formatEth(summary.subtotal)}</dd>
      </div>
      <div className={row}>
        <dt>Desconto do lançamento</dt>
        <dd className="text-14 text-muted-foreground">{formatDiscount(summary.discount)}</dd>
      </div>
      <div className={row}>
        <dt>Taxa de rede</dt>
        <dd className="text-16 lg:text-18">
          {formatEth(summary.networkFee)}
          <span className="block text-right text-12 text-accent-text">Taxa estimada</span>
        </dd>
      </div>
      <div className={cn(row, 'pt-2 font-bold')}>
        <dt>Total</dt>
        <dd className="text-18 text-accent-text" data-testid="cart-total">
          {formatEth(summary.total)}
        </dd>
      </div>
    </dl>
  )
}

/**
 * Resumo do pedido (valores vindos da API), com cupom e as ações finais. No desktop é a coluna
 * "Resumo da carteira"; no mobile, o painel fixo na base da tela.
 */
export function CartSummary({
  cart,
  actions,
  variant,
  canCheckout,
  onCheckout,
}: {
  cart: Cart
  actions: Actions
  variant: Variant
  canCheckout: boolean
  onCheckout: () => void
}) {
  const mobile = variant === 'mobile'
  return (
    <section
      aria-labelledby={`resumo-${variant}`}
      aria-busy={actions.busy}
      data-testid="cart-summary"
      className={cn(
        'flex flex-col',
        mobile
          ? 'sticky bottom-0 -mx-6 mt-auto gap-4 rounded-t-[32px] bg-card px-6 pt-6 pb-8 shadow-[0_-8px_24px_rgb(10_6_4/0.4)] sm:mx-0'
          : 'gap-5',
      )}
    >
      <h2
        id={`resumo-${variant}`}
        className={cn(
          'text-18 font-bold',
          mobile ? 'sr-only' : 'border-b border-border pb-2 leading-5',
        )}
      >
        Resumo da carteira
      </h2>
      <CouponForm cart={cart} actions={actions} variant={variant} />
      <SummaryRows cart={cart} />
      <div className="flex flex-col gap-3">
        <Button
          variant={mobile ? 'pill' : 'primary'}
          size={mobile ? 'xl' : 'lg'}
          className={cn('w-full', mobile ? 'h-[60px] rounded-full text-16' : 'text-15')}
          disabled={!canCheckout}
          onClick={onCheckout}
        >
          Conectar e finalizar
        </Button>
        {!canCheckout && cart.items.length > 0 ? (
          <p className="text-center text-13 text-coral">
            Remova os itens esgotados para continuar.
          </p>
        ) : null}
        {mobile ? null : (
          <Link to="/" className={cn(buttonVariants({ variant: 'ghost' }), 'self-center')}>
            Continuar explorando
          </Link>
        )}
      </div>
    </section>
  )
}

/**
 * Mesmas dimensões do resumo carregado (conferidas em `e2e/cart.spec.ts`), para não haver
 * deslocamento de layout quando os valores chegam.
 */
export function CartSummarySkeleton({ variant }: { variant: Variant }) {
  const mobile = variant === 'mobile'
  return (
    <div
      aria-hidden="true"
      data-testid="cart-summary"
      className={cn(
        'flex flex-col gap-4',
        mobile
          ? 'sticky bottom-0 -mx-6 mt-auto rounded-t-[32px] bg-card px-6 pt-6 pb-8 sm:mx-0'
          : 'gap-5',
      )}
    >
      {mobile ? null : <Skeleton className="h-[29px] w-full" />}
      <Skeleton className={mobile ? 'h-[50px] rounded-full' : 'h-[68px]'} />
      <div className={cn('flex flex-col justify-between', mobile ? 'h-[141px]' : 'h-[154px]')}>
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-9" />
        <Skeleton className="h-6" />
      </div>
      {mobile ? (
        <Skeleton className="h-[60px] rounded-full" />
      ) : (
        <div className="flex h-[96px] flex-col gap-3">
          <Skeleton className="h-11" />
          <Skeleton className="h-10 w-1/2 self-center" />
        </div>
      )}
    </div>
  )
}

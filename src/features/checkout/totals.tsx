import { eth, formatEth } from '@/lib/money'
import { cn } from '@/lib/utils'

/** Subtotal, desconto, taxa de rede e total (valores da API, sem recalcular). */
export function Totals({
  subtotal,
  discount,
  networkFee,
  total,
  className,
  testId,
}: {
  subtotal: string
  discount: string
  networkFee: string
  total: string
  className?: string
  testId?: string
}) {
  const row = 'flex items-baseline justify-between gap-4'
  return (
    <dl className={cn('flex flex-col gap-2.5 text-16', className)}>
      <div className={row}>
        <dt>Subtotal</dt>
        <dd className="text-18">{formatEth(subtotal)}</dd>
      </div>
      <div className={row}>
        <dt>Desconto do lançamento</dt>
        <dd className="text-14 text-muted-foreground">
          (-) {eth(discount).eq(0) ? '00.00' : formatEth(discount, { unit: false })}
        </dd>
      </div>
      <div>
        <div className={row}>
          <dt>Taxa de rede</dt>
          <dd className="text-18">{formatEth(networkFee)}</dd>
        </div>
        <p className="text-right text-12 text-accent-text">Taxa estimada</p>
      </div>
      <div className={cn(row, 'border-t border-border pt-3 font-bold')}>
        <dt>Total</dt>
        <dd className="text-18 text-accent-text" data-testid={testId}>
          {formatEth(total)}
        </dd>
      </div>
    </dl>
  )
}

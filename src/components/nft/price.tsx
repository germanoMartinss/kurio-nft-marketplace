import type { EthAmount } from '@/contracts/common'
import { formatEth } from '@/lib/money'
import { cn } from '@/lib/utils'

/** Preço em ETH; com preço anterior, mostra o valor riscado (anunciado como "preço anterior"). */
export function Price({
  value,
  previous,
  className,
}: {
  value: EthAmount
  previous?: EthAmount | null
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-baseline gap-x-3 text-18 leading-4 font-bold text-accent-text',
        className,
      )}
    >
      <span>{formatEth(value)}</span>
      {previous ? (
        <s className="font-normal text-muted-foreground">
          <span className="sr-only">Preço anterior: </span>
          {formatEth(previous)}
        </s>
      ) : null}
    </p>
  )
}

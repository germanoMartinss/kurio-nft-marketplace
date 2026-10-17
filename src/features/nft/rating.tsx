import { Star } from '@/components/icons'
import { cn } from '@/lib/utils'

export function Rating({
  average,
  count,
  compact = false,
}: {
  average: number
  count: number
  compact?: boolean
}) {
  const label = `Avaliação ${average.toLocaleString('pt-BR')} de 5, ${count} avaliações de colecionadores`
  if (compact) {
    return (
      <p className="flex items-center gap-1 rounded-full border border-border-soft px-2 py-0.5 text-14 font-bold">
        <span className="sr-only">{label}</span>
        <span aria-hidden="true" className="flex items-center gap-1">
          <Star className="size-4 text-primary" />
          {average.toFixed(1)}
          <span className="font-normal text-muted-foreground">({count})</span>
        </span>
      </p>
    )
  }
  return (
    <p className="flex items-center gap-1 text-15">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="flex gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              'size-[13px]',
              index < Math.round(average) ? 'text-primary' : 'text-muted-foreground',
            )}
          />
        ))}
      </span>
      <span aria-hidden="true">{count} avaliações de colecionadores</span>
    </p>
  )
}

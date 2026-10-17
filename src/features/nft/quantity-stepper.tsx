import { Minus, Plus } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * Seletor de quantidade com os botões circulares do Figma. Inteiro entre 1 e `max`; o limite é
 * anunciado (região viva) quando atingido, não só sinalizado pelo botão desabilitado.
 */
export function QuantityStepper({
  value,
  max,
  onChange,
  label = 'Quantidade',
  size = 'lg',
  className,
}: {
  value: number
  max: number
  onChange: (value: number) => void
  label?: string
  size?: 'sm' | 'lg'
  className?: string
}) {
  const button = cn(
    'flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60',
    size === 'lg' ? 'size-[33px] border border-background' : 'h-7 w-[22px]',
  )
  const atMax = max > 0 && value >= max
  return (
    <div className={cn('flex items-center', size === 'lg' ? 'gap-5' : 'gap-3', className)}>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`Diminuir ${label.toLowerCase()}`}
      >
        <Minus className={size === 'lg' ? 'size-6' : 'size-4'} />
      </button>
      <output
        aria-label={label}
        aria-live="polite"
        className={cn('min-w-4 text-center', size === 'lg' ? 'text-20 leading-7' : 'text-18')}
      >
        {value}
      </output>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value + 1)}
        disabled={max === 0 || atMax}
        aria-label={`Aumentar ${label.toLowerCase()}`}
      >
        <Plus weight="bold" className={size === 'lg' ? 'size-5' : 'size-3.5'} />
      </button>
      <span className="sr-only" aria-live="polite">
        {atMax ? `Limite de ${max} unidade${max === 1 ? '' : 's'} atingido` : ''}
      </span>
    </div>
  )
}

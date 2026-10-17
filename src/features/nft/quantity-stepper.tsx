import { Minus, Plus } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * Seletor de quantidade com os botões circulares do Figma. Inteiro entre 1 e `max`; o limite é
 * anunciado (região viva) quando atingido, não só sinalizado pelo botão desabilitado.
 *
 * O "+" segue o Figma: no desktop é o ícone exportado (`plus.svg`); no mobile o Figma usa o
 * caractere "+" como texto dentro do círculo, reproduzido igual.
 *
 * `subject` identifica o item quando há vários steppers na tela (carrinho).
 */
export function QuantityStepper({
  value,
  max,
  onChange,
  label = 'Quantidade',
  subject,
  size = 'lg',
  disabled = false,
  className,
}: {
  value: number
  max: number
  onChange: (value: number) => void
  label?: string
  subject?: string
  size?: 'sm' | 'lg' | 'cart'
  disabled?: boolean
  className?: string
}) {
  const fullLabel = subject ? `${label} de ${subject}` : label
  const button = cn(
    'flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60',
    size === 'lg' && 'size-[33px] border border-background',
    size === 'sm' && 'h-7 w-[22px]',
    // Carrinho como no Figma: círculo escuro com borda no mobile, pílula laranja vertical no desktop.
    size === 'cart' &&
      'size-6 border border-border-soft bg-surface-raised text-foreground lg:h-7 lg:w-[18px] lg:border-0 lg:bg-primary lg:text-primary-foreground',
  )
  const iconSize = size === 'lg' ? 'size-6' : size === 'sm' ? 'size-4' : 'size-4 lg:size-3.5'
  const atMax = max > 0 && value >= max
  return (
    <div
      className={cn('flex items-center', size === 'lg' ? 'gap-5' : 'gap-3', className)}
      role="group"
      aria-label={fullLabel}
    >
      <button
        type="button"
        className={button}
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= 1}
        aria-label={`Diminuir ${label.toLowerCase()}${subject ? ` de ${subject}` : ''}`}
      >
        <Minus className={iconSize} />
      </button>
      <output
        aria-label={fullLabel}
        aria-live="polite"
        className={cn(
          'min-w-4 text-center',
          size === 'lg' ? 'text-20 leading-7' : size === 'sm' ? 'text-18' : 'text-18 lg:text-16',
        )}
      >
        {value}
      </output>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value + 1)}
        disabled={disabled || max === 0 || atMax}
        aria-label={`Aumentar ${label.toLowerCase()}${subject ? ` de ${subject}` : ''}`}
      >
        <Plus className={cn(iconSize, 'hidden lg:block')} />
        <span aria-hidden="true" className="text-20 leading-none font-medium lg:hidden">
          +
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {atMax ? `Limite de ${max} unidade${max === 1 ? '' : 's'} atingido` : ''}
      </span>
    </div>
  )
}

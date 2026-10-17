import { Heart, HeartFilled } from '@/components/icons'
import { cn } from '@/lib/utils'

import { useFavorites, useToggleFavorite } from './queries'

/** Botão de favoritar com estado anunciado (`aria-pressed`) e atualização otimista. */
export function FavoriteButton({
  nftId,
  name,
  className,
  variant = 'icon',
}: {
  nftId: string
  name: string
  className?: string
  variant?: 'icon' | 'labeled'
}) {
  const { ids } = useFavorites()
  const toggle = useToggleFavorite()
  const isFavorite = ids.has(nftId)
  const Icon = isFavorite ? HeartFilled : Heart

  if (variant === 'labeled') {
    return (
      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => toggle(nftId, name, !isFavorite)}
        className={cn(
          'flex h-10 items-center justify-center gap-2 rounded-md border border-primary px-4 text-16 font-medium text-accent-text transition-colors hover:bg-primary/10',
          className,
        )}
      >
        <Icon className="size-5" aria-hidden />
        {isFavorite ? 'Favoritado' : 'Favoritar'}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remover ${name} da lista de interesse`
          : `Adicionar ${name} à lista de interesse`
      }
      onClick={() => toggle(nftId, name, !isFavorite)}
      className={cn(
        'flex items-center justify-center text-accent-text transition-colors hover:text-primary',
        className,
      )}
    >
      <Icon className="size-[18px]" aria-hidden />
    </button>
  )
}

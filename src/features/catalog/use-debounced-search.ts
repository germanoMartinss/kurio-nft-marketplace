import { useEffect, useEffectEvent, useState } from 'react'

const SEARCH_DEBOUNCE_MS = 350

/**
 * Campo de busca ligado à URL: digita localmente e publica depois de uma pausa (uma entrada no
 * histórico por busca, não por tecla). Se a URL mudar por fora (voltar/avançar), o campo acompanha.
 */
export function useDebouncedSearch(
  value: string | undefined,
  onCommit: (value: string | undefined) => void,
) {
  const current = value ?? ''
  const [draft, setDraft] = useState(current)
  const [lastValue, setLastValue] = useState(current)

  // A URL mudou por fora (histórico, "limpar filtros"): o rascunho passa a refletir a URL.
  if (current !== lastValue) {
    setLastValue(current)
    setDraft(current)
  }

  const commit = useEffectEvent((next: string) => onCommit(next || undefined))

  useEffect(() => {
    const next = draft.trim()
    if (next === current) return
    const timer = setTimeout(() => commit(next), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [draft, current])

  return [draft, setDraft] as const
}

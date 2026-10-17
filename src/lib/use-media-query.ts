import { useSyncExternalStore } from 'react'

/** Acompanha uma media query. Usado onde desktop e mobile têm estruturas diferentes (não só estilo). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
  )
}

/** A partir de `lg` (1024px) vale o layout de desktop. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

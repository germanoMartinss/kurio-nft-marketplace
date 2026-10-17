import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { bindNftSync } from './nft-sync'
import { sessionSocket } from './session-socket'

/** Mantém os caches em sincronia com os eventos do socket da sessão enquanto a aplicação está montada. */
export function useRealtimeSync() {
  const queryClient = useQueryClient()
  useEffect(
    () => bindNftSync(queryClient, (listener) => sessionSocket.subscribe(listener)),
    [queryClient],
  )
}

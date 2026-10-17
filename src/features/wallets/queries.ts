import { queryOptions, useQuery } from '@tanstack/react-query'

import { listWallets } from '@/api/wallets'
import { useSessionUser } from '@/features/auth/session-store'

export const walletKeys = {
  list: (userId: string) => ['user', userId, 'wallets'] as const,
}

export const walletsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: walletKeys.list(userId),
    queryFn: async ({ signal }) => (await listWallets(signal)).items,
  })

/** Carteiras cadastradas do usuário autenticado. */
export function useWallets() {
  const user = useSessionUser()
  return useQuery({ ...walletsQueryOptions(user?.id ?? ''), enabled: Boolean(user) })
}

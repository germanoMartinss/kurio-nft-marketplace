import { queryOptions, useQuery } from '@tanstack/react-query'

import { getOrder } from '@/api/orders'
import { useSessionUser } from '@/features/auth/session-store'

/** Pedidos são privados: sempre sob o usuário, para sair do cache junto com o logout. */
export const orderKeys = {
  all: (userId: string) => ['user', userId, 'orders'] as const,
  detail: (userId: string, orderId: string) => [...orderKeys.all(userId), orderId] as const,
}

export const orderQueryOptions = (userId: string, orderId: string) =>
  queryOptions({
    queryKey: orderKeys.detail(userId, orderId),
    queryFn: ({ signal }) => getOrder(orderId, signal),
  })

export function useOrder(orderId: string) {
  const user = useSessionUser()
  return useQuery({ ...orderQueryOptions(user?.id ?? '', orderId), enabled: Boolean(user) })
}

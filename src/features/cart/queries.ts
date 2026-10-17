import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  acknowledgeCartNotices,
  applyCoupon,
  getCart,
  removeCartItem,
  removeCoupon,
  updateCartItem,
} from '@/api/cart'
import { ApiRequestError } from '@/api/errors'

import { useCartKey } from './keys'

/**
 * O carrinho é calculado pela API (subtotal, desconto, taxa e total). O cliente só exibe: toda
 * mutação devolve o carrinho recalculado, que é gravado direto na chave do dono.
 */
export const cartQueryOptions = (key: ReturnType<typeof useCartKey>) =>
  queryOptions({
    queryKey: key,
    queryFn: ({ signal }) => getCart('ethereum', signal),
  })

export function useCart() {
  return useQuery(cartQueryOptions(useCartKey()))
}

/** Mutations do carrinho. Uma por vez (`isPending`), para que as respostas nunca cheguem fora de ordem. */
export function useCartActions() {
  const queryClient = useQueryClient()
  const key = useCartKey()

  const onSuccess = (cart: Awaited<ReturnType<typeof getCart>>) => {
    queryClient.setQueryData(key, cart)
  }
  // Conflito de disponibilidade: o carrinho exibido estava desatualizado; recarrega da API.
  const onError = (error: unknown) => {
    if (error instanceof ApiRequestError && error.code === 'AVAILABILITY_CONFLICT') {
      toast.error(error.message)
      void queryClient.invalidateQueries({ queryKey: key })
    } else if (error instanceof ApiRequestError && error.status === 404) {
      toast.error('Este item não está mais no carrinho.')
      void queryClient.invalidateQueries({ queryKey: key })
    } else if (!(error instanceof ApiRequestError && error.code.startsWith('COUPON_'))) {
      toast.error('Não foi possível atualizar o carrinho. Tente novamente.')
    }
  }
  // Cancela buscas em andamento: uma resposta antiga não pode sobrescrever a mutation.
  const onMutate = () => queryClient.cancelQueries({ queryKey: key })

  const update = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItem(itemId, quantity),
    onMutate,
    onSuccess,
    onError,
  })
  const remove = useMutation({
    mutationFn: (itemId: string) => removeCartItem(itemId),
    onMutate,
    onSuccess,
    onError,
  })
  const applyCode = useMutation({
    mutationFn: (code: string) => applyCoupon({ code }),
    onMutate,
    onSuccess,
    onError,
  })
  const removeCode = useMutation({
    mutationFn: () => removeCoupon(),
    onMutate,
    onSuccess,
    onError,
  })
  const acknowledge = useMutation({
    mutationFn: () => acknowledgeCartNotices(),
    onMutate,
    onSuccess,
    onError,
  })

  return {
    update,
    remove,
    applyCode,
    removeCode,
    acknowledge,
    busy:
      update.isPending ||
      remove.isPending ||
      applyCode.isPending ||
      removeCode.isPending ||
      acknowledge.isPending,
  }
}

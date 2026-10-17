import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addCartItem } from '@/api/cart'
import type { CartItemAdd } from '@/contracts/cart'
import { useCartKey } from '@/features/cart/keys'

/**
 * Adiciona ao carrinho pela API (que aplica a disponibilidade por NFT e edição). A resposta é o
 * carrinho atualizado, gravado direto no cache do dono atual.
 */
export function useAddToCart() {
  const queryClient = useQueryClient()
  const cartKey = useCartKey()
  return useMutation({
    mutationFn: (item: CartItemAdd & { name: string }) =>
      addCartItem({ nftId: item.nftId, editionId: item.editionId, quantity: item.quantity }),
    onSuccess: (cart, item) => {
      queryClient.setQueryData(cartKey, cart)
      toast.success(`${item.name} adicionado ao carrinho`, {
        description: `${item.quantity} unidade${item.quantity === 1 ? '' : 's'}.`,
      })
    },
  })
}

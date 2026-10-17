import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { ApiRequestError } from '@/api/errors'
import type { Edition, NftDetail } from '@/contracts/nft'

import { useAddToCart } from './use-add-to-cart'

/**
 * Estado de compra do detalhe: edição, quantidade (limitada pela disponibilidade da edição e pelo
 * máximo por pedido) e a ação de adicionar ao carrinho, compartilhados pelos layouts desktop e mobile.
 */
export function usePurchase(nft: NftDetail) {
  const navigate = useNavigate()
  const addToCart = useAddToCart()
  const [editionId, setEditionId] = useState(() => defaultEdition(nft.editions))
  const [quantity, setQuantity] = useState(1)

  const edition = nft.editions.find((item) => item.id === editionId)
  const max = edition ? Math.min(edition.available, nft.maxPerOrder) : 0
  const soldOut = nft.editions.every((item) => item.available === 0)
  // Se a disponibilidade cair (ex.: evento em tempo real), a quantidade acompanha o novo limite.
  const safeQuantity = Math.max(1, Math.min(quantity, Math.max(max, 1)))

  const add = (then: 'carrinho' | 'ficar') => {
    if (!edition || max === 0) return
    addToCart.mutate(
      { nftId: nft.id, editionId: edition.id, quantity: safeQuantity, name: nft.name },
      { onSuccess: () => (then === 'carrinho' ? void navigate({ to: '/carrinho' }) : undefined) },
    )
  }

  const error =
    addToCart.error instanceof ApiRequestError
      ? addToCart.error.message
      : addToCart.error
        ? 'Não foi possível adicionar ao carrinho.'
        : null

  return {
    edition,
    editionId,
    setEditionId: (id: string) => {
      setEditionId(id)
      addToCart.reset()
    },
    quantity: safeQuantity,
    setQuantity: (value: number) => {
      setQuantity(Math.max(1, Math.min(value, max)))
      addToCart.reset()
    },
    max,
    soldOut,
    add,
    pending: addToCart.isPending,
    error,
    availabilityText: edition
      ? edition.available === 0
        ? 'Edição esgotada'
        : edition.supply === null
          ? `Edição aberta · até ${nft.maxPerOrder} por pedido`
          : `${edition.available} disponíve${edition.available === 1 ? 'l' : 'is'} · até ${nft.maxPerOrder} por pedido`
      : 'Todas as edições estão esgotadas',
  }
}

export type Purchase = ReturnType<typeof usePurchase>

/** Edição inicial: 1/50 (a do Figma) se disponível; senão, a primeira com estoque. */
function defaultEdition(editions: Edition[]) {
  return (
    editions.find((edition) => edition.id === '1-50' && edition.available > 0) ??
    editions.find((edition) => edition.available > 0)
  )?.id
}

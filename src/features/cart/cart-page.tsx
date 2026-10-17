import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'

import { Breadcrumb } from '@/components/common/breadcrumb'
import { errorMessage } from '@/components/common/error-message'
import { EmptyState, ErrorState } from '@/components/common/query-states'
import { MobileTopBar } from '@/components/layout/mobile-top-bar'
import { buttonVariants } from '@/components/ui/button'
import type { Cart, CartItem } from '@/contracts/cart'
import { catalogQueryOptions } from '@/features/catalog/queries'
import { NftCarousel } from '@/features/nft/related-nfts'

import { CartCards, CartItemsSkeleton, CartTable } from './cart-items'
import { CartNotices } from './cart-notices'
import { CartSummary, CartSummarySkeleton } from './cart-summary'
import { useCart, useCartActions } from './queries'

export function CartPage() {
  const query = useCart()
  const actions = useCartActions()
  const navigate = useNavigate()
  const cart = query.data

  const itemActions = {
    busy: actions.busy,
    onQuantity: (item: CartItem, quantity: number) =>
      actions.update.mutate({ itemId: item.id, quantity }),
    onRemove: (item: CartItem) => actions.remove.mutate(item.id),
  }
  const canCheckout =
    !!cart && cart.items.length > 0 && !cart.items.some((i) => i.notices.includes('indisponivel'))
  const checkout = () => void navigate({ to: '/pagamento' })

  return (
    <div className="flex min-h-dvh flex-col gap-0 lg:min-h-0 lg:gap-24 lg:pb-10">
      <MobileTopBar title="Carrinho de NFTs" fallbackTo="/" />
      <div className="container-page flex flex-1 flex-col gap-2 max-lg:px-6 lg:flex-none lg:pt-8">
        <div className="hidden lg:block">
          <Breadcrumb current="Carrinho" />
        </div>
        <h1 className="sr-only max-lg:hidden">Carrinho de NFTs</h1>
        {query.isError && !cart ? (
          <ErrorState
            title="Não foi possível carregar o carrinho"
            message={errorMessage(query.error)}
            onRetry={() => void query.refetch()}
            retrying={query.isFetching}
          />
        ) : (
          <CartBody
            cart={cart}
            itemActions={itemActions}
            actions={actions}
            canCheckout={canCheckout}
            onCheckout={checkout}
          />
        )}
      </div>
      {cart && cart.items.length > 0 ? <CartSuggestions cart={cart} /> : null}
    </div>
  )
}

function CartBody({
  cart,
  itemActions,
  actions,
  canCheckout,
  onCheckout,
}: {
  cart: Cart | undefined
  itemActions: {
    busy: boolean
    onQuantity: (item: CartItem, quantity: number) => void
    onRemove: (item: CartItem) => void
  }
  actions: ReturnType<typeof useCartActions>
  canCheckout: boolean
  onCheckout: () => void
}) {
  if (cart && cart.items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[640px] py-8 lg:py-16">
        <EmptyState
          title="Seu carrinho está vazio"
          message="Explore o mercado e adicione NFTs para finalizar sua compra."
          action={
            <Link to="/" hash="catalogo" className={buttonVariants({ variant: 'primary' })}>
              Explorar o mercado
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <>
      <CartNotices
        cart={cart}
        onAcknowledge={() => actions.acknowledge.mutate()}
        acknowledging={actions.acknowledge.isPending}
      />
      {/* Desktop: tabela à esquerda e resumo à direita. */}
      <div className="hidden items-start gap-x-10 lg:grid lg:grid-cols-[minmax(0,1fr)_332px] xl:gap-x-[86px]">
        <div className="flex flex-col gap-4">
          {cart ? <CartTable items={cart.items} {...itemActions} /> : <CartItemsSkeleton />}
        </div>
        <div className="pt-[22px]">
          {cart ? (
            <CartSummary
              cart={cart}
              actions={actions}
              variant="desktop"
              canCheckout={canCheckout}
              onCheckout={onCheckout}
            />
          ) : (
            <CartSummarySkeleton variant="desktop" />
          )}
        </div>
      </div>

      {/* Mobile e tablet: cartões e painel de resumo fixo na base. */}
      <div className="mx-auto flex w-full max-w-[640px] flex-1 flex-col gap-4 lg:hidden">
        {cart ? <CartCards items={cart.items} {...itemActions} /> : <CartItemsSkeleton />}
        {cart ? (
          <CartSummary
            cart={cart}
            actions={actions}
            variant="mobile"
            canCheckout={canCheckout}
            onCheckout={onCheckout}
          />
        ) : (
          <CartSummarySkeleton variant="mobile" />
        )}
      </div>
    </>
  )
}

/** "Colecionadores também viram": sugestões que ainda não estão no carrinho (só no desktop, como no Figma). */
function CartSuggestions({ cart }: { cart: Cart }) {
  const { data, isPending } = useQuery(catalogQueryOptions({ pageSize: 12, sort: 'recentes' }))
  const inCart = new Set(cart.items.map((item) => item.nftId))
  const items = (data?.items ?? []).filter((item) => !inCart.has(item.id))
  return (
    <div className="hidden lg:block">
      <NftCarousel title="Colecionadores também viram" items={items} isPending={isPending} />
    </div>
  )
}

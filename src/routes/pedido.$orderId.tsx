import { createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/features/auth/guard'
import { OrderPage } from '@/features/orders/order-page'

export const Route = createFileRoute('/pedido/$orderId')({
  beforeLoad: requireAuth,
  component: function OrderRoute() {
    const { orderId } = Route.useParams()
    return <OrderPage orderId={orderId} />
  },
})

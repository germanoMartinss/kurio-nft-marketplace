import { createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/features/auth/guard'
import { PaymentPage } from '@/features/checkout/payment-page'

export const Route = createFileRoute('/pagamento')({
  beforeLoad: requireAuth,
  component: PaymentPage,
})

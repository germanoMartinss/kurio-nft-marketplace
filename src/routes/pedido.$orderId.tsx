import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'

export const Route = createFileRoute('/pedido/$orderId')({
  component: () => <PagePlaceholder title="Confirmação de pedido" />,
})

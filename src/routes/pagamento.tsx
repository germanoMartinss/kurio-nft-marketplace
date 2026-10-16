import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'

export const Route = createFileRoute('/pagamento')({
  component: () => <PagePlaceholder title="Pagamento" />,
})

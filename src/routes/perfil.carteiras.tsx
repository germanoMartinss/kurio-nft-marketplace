import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'
import { requireAuth } from '@/features/auth/guard'

export const Route = createFileRoute('/perfil/carteiras')({
  beforeLoad: requireAuth,
  component: () => <PagePlaceholder title="Carteiras" />,
})

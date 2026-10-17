import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'
import { requireAuth } from '@/features/auth/guard'

export const Route = createFileRoute('/perfil/')({
  beforeLoad: requireAuth,
  component: () => <PagePlaceholder title="Perfil do colecionador" />,
})

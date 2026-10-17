import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'
import { validateRedirectSearch } from '@/features/auth/redirect'

export const Route = createFileRoute('/entrar')({
  validateSearch: validateRedirectSearch,
  component: () => <PagePlaceholder title="Entrar" />,
})

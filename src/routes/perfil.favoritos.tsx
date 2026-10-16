import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'

export const Route = createFileRoute('/perfil/favoritos')({
  component: () => <PagePlaceholder title="Lista de interesse" />,
})

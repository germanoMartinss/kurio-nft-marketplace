import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'
import { requireAuth } from '@/features/auth/guard'
import { ProfileLayout } from '@/features/profile/profile-layout'

export const Route = createFileRoute('/perfil/favoritos')({
  beforeLoad: requireAuth,
  component: () => (
    <ProfileLayout title="Lista de interesse">
      <PagePlaceholder title="Lista de interesse" />
    </ProfileLayout>
  ),
})

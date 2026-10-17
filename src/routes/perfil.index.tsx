import { createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/features/auth/guard'
import { ProfilePage } from '@/features/profile/profile-page'

export const Route = createFileRoute('/perfil/')({
  beforeLoad: requireAuth,
  component: ProfilePage,
})

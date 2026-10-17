import { createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/features/auth/guard'
import { WalletsPage } from '@/features/profile/wallets-page'

export const Route = createFileRoute('/perfil/carteiras')({
  beforeLoad: requireAuth,
  component: WalletsPage,
})

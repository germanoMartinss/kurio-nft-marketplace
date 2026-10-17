import { createFileRoute } from '@tanstack/react-router'

import { PagePlaceholder } from '@/components/common/page-placeholder'
import { requireAuth } from '@/features/auth/guard'
import { LogoutButton } from '@/features/auth/logout-button'

export const Route = createFileRoute('/perfil/')({
  beforeLoad: requireAuth,
  component: () => (
    <>
      <PagePlaceholder title="Perfil do colecionador" />
      <div className="flex justify-center pb-10 lg:hidden">
        <LogoutButton />
      </div>
    </>
  ),
})

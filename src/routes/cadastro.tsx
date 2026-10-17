import { createFileRoute } from '@tanstack/react-router'

import { AuthScreen } from '@/features/auth/auth-screen'
import { validateRedirectSearch } from '@/features/auth/redirect'

export const Route = createFileRoute('/cadastro')({
  validateSearch: validateRedirectSearch,
  component: function Register() {
    const { redirect } = Route.useSearch()
    return <AuthScreen mode="cadastro" redirect={redirect} />
  },
})

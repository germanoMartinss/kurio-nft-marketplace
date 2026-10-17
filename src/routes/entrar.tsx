import { createFileRoute } from '@tanstack/react-router'

import { AuthScreen } from '@/features/auth/auth-screen'
import { validateRedirectSearch } from '@/features/auth/redirect'

export const Route = createFileRoute('/entrar')({
  validateSearch: validateRedirectSearch,
  component: function Login() {
    const { redirect } = Route.useSearch()
    return <AuthScreen mode="entrar" redirect={redirect} />
  },
})

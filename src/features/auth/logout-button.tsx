import { SignOut } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { useLogout } from './use-auth'

/** "Sair da conta" para o mobile, que não tem o menu do usuário do header. */
export function LogoutButton({ className }: { className?: string }) {
  const logout = useLogout()
  return (
    <Button
      variant="outline"
      className={className}
      disabled={logout.isPending}
      onClick={() => logout.mutate()}
    >
      <SignOut /> Sair da conta
    </Button>
  )
}

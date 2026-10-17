import { Link } from '@tanstack/react-router'

import { Heart, SignOut, User, Wallet } from '@/components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SessionUser } from '@/contracts/auth'
import { useLogout } from '@/features/auth/use-auth'

/** Menu do usuário autenticado (header de desktop): perfil, lista de interesse, carteiras e sair. */
export function UserMenu({ user }: { user: SessionUser }) {
  const logout = useLogout()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-[34px] items-center gap-2 rounded-md border border-primary pr-3 pl-1 text-16 font-medium text-accent-text outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-full bg-primary text-12 font-bold text-primary-foreground"
          >
            {user.displayName.charAt(0).toUpperCase()}
          </span>
          <span className="max-w-32 truncate">{user.displayName}</span>
          <span className="sr-only">, menu da conta</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/perfil">
            <User /> Meu perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/perfil/favoritos">
            <Heart /> Lista de interesse
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/perfil/carteiras">
            <Wallet /> Carteiras
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => logout.mutate()}>
          <SignOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { useSessionUser } from '@/features/auth/session-store'
import { getGuestId } from '@/lib/client-storage'

/**
 * O carrinho tem dono: o usuário autenticado ou o visitante. A chave reflete isso, para que o
 * carrinho de uma sessão nunca apareça em outra (troca de usuário, login, logout).
 */
export const cartKeys = {
  user: (userId: string) => ['user', userId, 'cart'] as const,
  guest: (guestId: string) => ['guest', guestId, 'cart'] as const,
}

export function useCartKey() {
  const user = useSessionUser()
  return user ? cartKeys.user(user.id) : cartKeys.guest(getGuestId())
}

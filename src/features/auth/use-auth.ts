import { useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { login, logout, register } from '@/api/auth'
import { mergeGuestCart } from '@/api/cart'
import type { AuthSession, LoginRequest, RegisterRequest } from '@/contracts/auth'
import { cartKeys } from '@/features/cart/keys'
import { getGuestId } from '@/lib/client-storage'

import { isPrivatePath } from './private-paths'
import { sessionStore } from './session-store'

/**
 * Conclui a autenticação: grava a sessão e transfere o carrinho do visitante para a conta
 * (a API soma respeitando a disponibilidade). Falha na junção não derruba o login: os itens
 * continuam no carrinho de visitante e o usuário é avisado.
 */
async function completeAuthentication(session: AuthSession, queryClient: QueryClient) {
  sessionStore.set(session)
  const guestId = getGuestId()
  try {
    const { cart, adjusted } = await mergeGuestCart(guestId)
    queryClient.setQueryData(cartKeys.user(session.user.id), cart)
    queryClient.removeQueries({ queryKey: cartKeys.guest(guestId) })
    if (adjusted.length > 0) {
      toast.info('Alguns itens do carrinho foram ajustados', {
        description: 'A quantidade foi limitada pela disponibilidade atual.',
      })
    }
  } catch {
    toast.warning('Não foi possível unir o carrinho de visitante', {
      description: 'Seus itens continuam salvos; abra o carrinho para conferir.',
    })
  }
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: LoginRequest) =>
      completeAuthentication(await login(body), queryClient),
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: RegisterRequest) =>
      completeAuthentication(await register(body), queryClient),
  })
}

/**
 * Logout: encerra a sessão no servidor (se a chamada falhar, a sessão local é encerrada do mesmo
 * jeito, pois sair nunca deve ficar preso). Cache privado e socket são limpos pelo
 * `bindSessionLifecycle`, que reage à mudança da sessão.
 */
export function useLogout() {
  const router = useRouter()
  return useMutation({
    mutationFn: async () => {
      try {
        await logout()
      } catch {
        // Sessão local é encerrada de qualquer forma.
      }
      sessionStore.set(null)
    },
    onSuccess: () => {
      toast.success('Você saiu da conta')
      if (isPrivatePath(router.latestLocation.pathname)) void router.navigate({ to: '/' })
    },
  })
}

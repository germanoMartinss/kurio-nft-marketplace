import type { QueryClient } from '@tanstack/react-query'
import type { AnyRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { getSession } from '@/api/auth'
import { isAuthPath } from '@/features/auth/redirect'
import { isPrivatePath } from '@/features/auth/private-paths'
import { sessionStore } from '@/features/auth/session-store'
import { clearCheckoutDraft } from '@/features/checkout/draft'
import { sessionSocket } from '@/realtime/session-socket'

/**
 * Amarra a sessão ao resto da aplicação, fora do React (assim vale também para mudanças vindas
 * de outra aba):
 *  - troca de usuário ou logout: cancela e remove o cache privado do usuário anterior
 *    (`['user', prevId]`) e troca o socket (listeners removidos, conexão encerrada);
 *  - expiração: avisa e, em tela privada, leva ao login guardando o destino em `?redirect=`;
 *  - refresh: revalida o token guardado com a API.
 */
export function bindSessionLifecycle(queryClient: QueryClient, router: AnyRouter) {
  let previousUserId = sessionStore.get()?.user.id ?? null
  let previousToken = sessionStore.get()?.token ?? null
  // A conexão do socket não é necessária para o primeiro render: sai do caminho crítico de carga
  // (o `socket.io-client` seria baixado junto com o código da tela). Usa a sessão do momento.
  runWhenIdle(() => void sessionSocket.attach(sessionStore.get()?.token ?? null))

  sessionStore.subscribe(() => {
    const session = sessionStore.get()
    const userId = session?.user.id ?? null
    if (previousUserId && previousUserId !== userId) {
      const key = ['user', previousUserId] as const
      void queryClient.cancelQueries({ queryKey: key })
      queryClient.removeQueries({ queryKey: key })
      // Rascunhos do checkout: preservados quando a sessão só expirou (o usuário volta e retoma),
      // descartados no logout e na troca de usuário.
      if (!sessionStore.endedByExpiry()) clearCheckoutDraft(previousUserId)
    }
    if ((session?.token ?? null) !== previousToken)
      void sessionSocket.attach(session?.token ?? null)
    previousUserId = userId
    previousToken = session?.token ?? null
  })

  sessionStore.onExpired(() => {
    // `latestLocation` inclui a navegação em andamento: o destino pretendido, não a tela de partida.
    const target = router.latestLocation
    if (isAuthPath(target.href)) return
    if (isPrivatePath(target.pathname)) {
      toast.warning('Sua sessão expirou', {
        description: 'Entre novamente para continuar de onde parou.',
      })
      void router.navigate({ to: '/entrar', search: { redirect: target.href }, replace: true })
    } else {
      toast.warning('Sua sessão expirou', {
        description: 'Você continua navegando como visitante.',
        action: {
          label: 'Entrar',
          onClick: () => void router.navigate({ to: '/entrar', search: { redirect: target.href } }),
        },
      })
    }
  })

  // Sessão recuperada do storage: confirma com a API. Um 401 cai no interceptor (expira).
  if (sessionStore.get()) {
    getSession()
      .then((current) => sessionStore.setUser(current.user))
      .catch(() => undefined)
  }
}

/** Executa quando o navegador está ocioso (no máximo 1,5 s depois), sem competir com a carga inicial. */
function runWhenIdle(task: () => void) {
  if ('requestIdleCallback' in window) window.requestIdleCallback(task, { timeout: 1500 })
  else setTimeout(task, 500)
}

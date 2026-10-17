import { Link, useRouter } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { HomePage } from '@/features/catalog/home-page'
import { useIsDesktop } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

import { isAuthPath } from './redirect'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { sessionStore } from './session-store'

type Mode = 'entrar' | 'cadastro'

const COPY = {
  entrar: {
    mobileTitle: 'Entrar',
    description: 'Entre para gerenciar sua carteira, coleção e perfil de criador.',
  },
  cadastro: {
    mobileTitle: 'Criar perfil de colecionador',
    description: 'Crie seu perfil de colecionador e conecte uma carteira quando quiser.',
  },
} as const

const noop = () => undefined

/**
 * Tela de entrar/criar conta. A URL manda (`/entrar`, `/cadastro`): no desktop vira um diálogo
 * sobre a página inicial, como no Figma; no mobile, uma página cheia. Depois de autenticar
 * (ou se já houver sessão), volta ao fluxo de origem (`?redirect=`) ou à página inicial.
 */
export function AuthScreen({ mode, redirect }: { mode: Mode; redirect?: string }) {
  const router = useRouter()
  const isDesktop = useIsDesktop()

  const leave = () => router.history.replace(redirect && !isAuthPath(redirect) ? redirect : '/')

  // Quem já chega com sessão não precisa desta tela. Quem acabou de entrar sai pelo
  // `onAuthenticated`, depois que o carrinho do visitante foi unido ao da conta.
  const arrivedSignedIn = useRef(Boolean(sessionStore.get()))
  useEffect(() => {
    if (arrivedSignedIn.current) leave()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form =
    mode === 'entrar' ? (
      <LoginForm
        variant={isDesktop ? 'dialog' : 'page'}
        redirect={redirect}
        onAuthenticated={leave}
      />
    ) : (
      <RegisterForm
        variant={isDesktop ? 'dialog' : 'page'}
        redirect={redirect}
        onAuthenticated={leave}
      />
    )

  if (!isDesktop) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-6 pt-[130px] pb-12">
        <Link
          to="/"
          aria-label="Kurio, página inicial"
          className="self-center text-28 font-bold tracking-brand"
        >
          KURIO
        </Link>
        <h1
          className={cn(
            'mt-[88px] mb-8 text-center font-bold',
            mode === 'cadastro' ? 'text-18' : 'text-20',
          )}
        >
          {COPY[mode].mobileTitle}
        </h1>
        {form}
      </div>
    )
  }

  return (
    <>
      <HomePage search={{}} onChange={noop} onClear={noop} />
      <Dialog open onOpenChange={(open) => (open ? undefined : leave())}>
        <DialogContent
          aria-describedby="auth-descricao"
          // O Figma ancora o diálogo a 160px do topo e não escurece a página ao fundo.
          overlayClassName="bg-background/25"
          className="top-40 max-h-[calc(100dvh-10.5rem)] max-w-[500px] translate-y-0 gap-0 overflow-y-auto px-20 pt-12 pb-16"
        >
          <DialogTitle className="flex items-center justify-center text-20 font-medium">
            <Link
              to="/entrar"
              search={{ redirect }}
              replace
              aria-current={mode === 'entrar' ? 'page' : undefined}
              className={cn(mode === 'entrar' ? 'text-accent-text' : 'text-foreground')}
            >
              Entrar
            </Link>
            <span aria-hidden="true" className="mx-2 h-5 w-px bg-primary" />
            <Link
              to="/cadastro"
              search={{ redirect }}
              replace
              aria-current={mode === 'cadastro' ? 'page' : undefined}
              className={cn(mode === 'cadastro' ? 'text-accent-text' : 'text-foreground')}
            >
              Criar conta
            </Link>
          </DialogTitle>
          <DialogDescription
            id="auth-descricao"
            className="mt-9 mb-6 text-center text-13 text-foreground"
          >
            {COPY[mode].description}
          </DialogDescription>
          {form}
        </DialogContent>
      </Dialog>
    </>
  )
}

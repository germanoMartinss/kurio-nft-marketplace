import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

/** Estado de erro com nova tentativa (mensagem anunciada por leitores de tela). */
export function ErrorState({
  title = 'Não foi possível carregar',
  message,
  onRetry,
  retrying = false,
}: {
  title?: string
  message: string
  onRetry: () => void
  retrying?: boolean
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card px-6 py-12 text-center"
    >
      <p className="text-18 font-bold">{title}</p>
      <p className="max-w-md text-14 leading-6 text-muted-foreground">{message}</p>
      <Button onClick={onRetry} disabled={retrying}>
        {retrying ? 'Tentando…' : 'Tentar novamente'}
      </Button>
    </div>
  )
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string
  message: string
  action?: ReactNode
}) {
  return (
    // role="status": a mudança para o estado vazio é anunciada por leitores de tela.
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card px-6 py-12 text-center"
    >
      <p className="text-18 font-bold">{title}</p>
      <p className="max-w-md text-14 leading-6 text-muted-foreground">{message}</p>
      {action}
    </div>
  )
}

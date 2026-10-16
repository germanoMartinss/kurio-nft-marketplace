import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
      <p className="text-14 font-bold tracking-brand text-accent-text">ERRO 404</p>
      <h1 className="text-24 font-bold">Página não encontrada</h1>
      <p className="max-w-md text-14 leading-6 text-muted-foreground">
        O endereço acessado não existe ou foi removido.
      </p>
      <Link to="/" className={buttonVariants()}>
        Voltar ao início
      </Link>
    </div>
  )
}

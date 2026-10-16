import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-sm font-bold tracking-widest text-accent">ERRO 404</p>
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="text-sm leading-6 text-muted-foreground">
        O endereço acessado não existe ou foi removido.
      </p>
      <Link to="/" className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-background">
        Voltar ao início
      </Link>
    </main>
  )
}

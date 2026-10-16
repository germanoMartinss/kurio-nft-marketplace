import { createFileRoute, Link } from '@tanstack/react-router'

// Página provisória: a home do Figma entra na Fase 4.
export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-2xl font-bold tracking-[0.1em]">KURIO</h1>
      <p className="text-sm text-muted-foreground">Marketplace em construção.</p>
      <Link to="/mocks" className="text-sm text-accent underline underline-offset-4">
        Painel de mocks
      </Link>
    </main>
  )
}

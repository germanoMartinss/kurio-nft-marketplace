/** Página provisória enquanto a tela correspondente não é implementada. */
export function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-3 py-16 text-center">
      <h1 className="text-22 font-bold">{title}</h1>
      <p className="text-14 text-muted-foreground">Tela em construção.</p>
    </div>
  )
}

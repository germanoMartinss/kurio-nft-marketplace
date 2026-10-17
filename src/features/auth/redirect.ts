/**
 * `?redirect=` das telas de autenticação: só caminhos internos são aceitos. Um valor externo
 * (ex.: "https://site-malicioso" ou "//site") é descartado, evitando open redirect.
 */
export interface RedirectSearch {
  redirect?: string
}

export function safeRedirect(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  return value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\')
    ? value
    : undefined
}

export function validateRedirectSearch(search: Record<string, unknown>): RedirectSearch {
  return { redirect: safeRedirect(search.redirect) }
}

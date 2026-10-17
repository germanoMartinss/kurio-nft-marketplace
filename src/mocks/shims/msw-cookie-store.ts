/**
 * Substituto do armazenamento de cookies do MSW no build (ver `vite.config.ts`).
 *
 * O MSW guarda os cookies da API simulada com `tough-cookie`, que arrasta `tldts` (lista de sufixos
 * públicos): cerca de 250 KB a mais no chunk dos mocks, baixado antes da primeira requisição. A
 * aplicação não usa cookies (a sessão é um token Bearer, ver ARCHITECTURE.md › Sessão), então o
 * armazenamento fica vazio e ignora `Set-Cookie` das respostas simuladas.
 */
export const cookieStore = {
  getCookies: (_url: string | URL) => [] as { key: string; value: string }[],
  setCookie: async (_cookie: string, _url: string | URL) => {},
}

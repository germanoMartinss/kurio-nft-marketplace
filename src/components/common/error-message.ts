import { ApiRequestError } from '@/api/errors'

/**
 * Texto do estado de erro conforme a causa: falha transitória (rede, timeout, 5xx) sugere checar a
 * conexão; um erro definitivo (ex.: 403 sem permissão) mostra a mensagem da API, sem a sugestão.
 */
export function errorMessage(error: unknown) {
  const hint = 'Verifique sua conexão e tente novamente.'
  if (!(error instanceof ApiRequestError)) return hint
  return error.isTransient ? `${error.message} ${hint}` : error.message
}

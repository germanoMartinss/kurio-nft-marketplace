import { isAxiosError } from 'axios'

import { apiErrorSchema, type ApiErrorCode } from '@/contracts/common'

/**
 * Erro normalizado da API. Toda falha de chamada REST chega à interface neste formato, seja
 * resposta de erro do contrato, falha de rede, timeout ou cancelamento.
 */
export class ApiRequestError extends Error {
  readonly code: ApiErrorCode | 'NETWORK' | 'TIMEOUT' | 'UNKNOWN'
  readonly status: number | null
  readonly fieldErrors: Record<string, string>
  readonly details: unknown

  constructor(options: {
    code: ApiRequestError['code']
    message: string
    status: number | null
    fieldErrors?: Record<string, string>
    details?: unknown
  }) {
    super(options.message)
    this.name = 'ApiRequestError'
    this.code = options.code
    this.status = options.status
    this.fieldErrors = options.fieldErrors ?? {}
    this.details = options.details
  }

  /** Falhas que podem dar certo numa nova tentativa. */
  get isTransient() {
    return (
      this.code === 'NETWORK' ||
      this.code === 'TIMEOUT' ||
      this.code === 'TRANSIENT' ||
      (this.status ?? 0) >= 500
    )
  }
}

export function toApiRequestError(error: unknown): unknown {
  if (!isAxiosError(error)) return error
  if (error.code === 'ERR_CANCELED') return error
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiRequestError({
      code: 'TIMEOUT',
      status: null,
      message: 'O servidor demorou para responder.',
    })
  }
  if (!error.response) {
    return new ApiRequestError({
      code: 'NETWORK',
      status: null,
      message: 'Sem conexão com o servidor.',
    })
  }
  const parsed = apiErrorSchema.safeParse(error.response.data)
  if (parsed.success) {
    const { code, message, fieldErrors, details } = parsed.data.error
    return new ApiRequestError({
      code,
      message,
      status: error.response.status,
      fieldErrors,
      details,
    })
  }
  return new ApiRequestError({
    code: 'UNKNOWN',
    status: error.response.status,
    message: 'Não foi possível concluir a operação.',
  })
}

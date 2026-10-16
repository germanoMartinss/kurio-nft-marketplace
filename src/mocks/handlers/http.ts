import {
  delay,
  http,
  HttpResponse,
  type DefaultBodyType,
  type HttpResponseResolver,
  type PathParams,
} from 'msw'
import type * as z from 'zod/mini'

import type { ApiError, ApiErrorCode } from '@/contracts/common'
import { env } from '@/env'

import { getScenario, nextCount, nextRandom } from '../scenarios/active'

export function apiError(
  status: number,
  code: ApiErrorCode,
  message: string,
  extra: Pick<ApiError, 'fieldErrors' | 'details'> = {},
) {
  return HttpResponse.json({ error: { code, message, ...extra } }, { status })
}

/** Valida o corpo com o schema do contrato; erros viram 422 com mensagens por campo. */
export async function parseBody<T extends z.ZodMiniType>(
  request: Request,
  schema: T,
): Promise<{ data: z.infer<T> } | { response: Response }> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return { response: apiError(422, 'VALIDATION', 'Corpo da requisição inválido.') }
  }
  const result = schema.safeParse(body)
  if (result.success) return { data: result.data }
  const fieldErrors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = issue.path.join('.')
    fieldErrors[key] ??= issue.message
  }
  return {
    response: apiError(422, 'VALIDATION', 'Revise os campos destacados.', { fieldErrors }),
  }
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface RouteOptions {
  /** Listagem do catálogo: sujeita ao cenário de respostas fora de ordem. */
  catalogList?: boolean
}

/**
 * Declara um handler da API aplicando antes as condições de rede do cenário ativo (sem conexão,
 * falhas injetadas, timeout, latência). A regra de negócio fica só no resolver.
 */
export function route<Params extends PathParams>(
  method: Method,
  path: string,
  resolver: HttpResponseResolver<Params, DefaultBodyType>,
  options: RouteOptions = {},
) {
  return http[method]<Params>(`${env.apiBaseUrl}${path}`, async (info) => {
    const blocked = await applyNetworkConditions(
      info.request,
      `${method.toUpperCase()} ${path}`,
      options,
    )
    if (blocked) return blocked
    return resolver(info)
  })
}

const CLIENT_TIMEOUT_EXCEEDED_MS = 15_000

async function applyNetworkConditions(request: Request, routeKey: string, options: RouteOptions) {
  const scenario = getScenario()
  if (scenario.offline) return HttpResponse.error()

  const method = request.method.toUpperCase()
  const pathname = new URL(request.url).pathname.slice(env.apiBaseUrl.length)
  for (const [index, rule] of (scenario.failures ?? []).entries()) {
    if (rule.method !== '*' && rule.method !== method) continue
    if (!globToRegExp(rule.path).test(pathname)) continue
    const count = nextCount(`falha:${index}`)
    if (rule.times === undefined || count <= rule.times) {
      await delay(scenario.latency.minMs)
      return apiError(rule.status, rule.code, 'Falha simulada pelo cenário de mocks.')
    }
  }

  if (scenario.firstRequestTimeout && nextCount(`timeout:${routeKey}`) === 1) {
    await delay(CLIENT_TIMEOUT_EXCEEDED_MS)
  }

  if (options.catalogList && scenario.outOfOrderCatalog) {
    await delay(nextCount('fora-de-ordem') % 2 === 1 ? 1500 : 150)
    return undefined
  }

  const { minMs, maxMs } = scenario.latency
  await delay(minMs === maxMs ? minMs : Math.round(minMs + nextRandom() * (maxMs - minMs)))
  return undefined
}

function globToRegExp(glob: string) {
  const escaped = glob.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(`^${escaped}$`)
}

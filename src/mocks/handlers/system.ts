import { http, HttpResponse } from 'msw'

import type { HealthResponse } from '@/contracts/system'
import { env } from '@/env'

export const systemHandlers = [
  http.get(`${env.apiBaseUrl}/health`, () =>
    HttpResponse.json<HealthResponse>({ status: 'ok', serverTime: new Date().toISOString() }),
  ),
]

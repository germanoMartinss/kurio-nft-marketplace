import {
  healthResponseSchema,
  newsletterResponseSchema,
  type NewsletterRequest,
} from '@/contracts/system'

import { http } from './http'
import { parseResponse } from './parse'

export async function getHealth(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/health', { signal })
  return parseResponse(healthResponseSchema, data)
}

export async function subscribeNewsletter(body: NewsletterRequest) {
  const { data } = await http.post<unknown>('/newsletter', body)
  return parseResponse(newsletterResponseSchema, data)
}

import { healthResponseSchema } from '@/contracts/system'

import { http } from './http'

export async function getHealth(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/health', { signal })
  return healthResponseSchema.parse(data)
}

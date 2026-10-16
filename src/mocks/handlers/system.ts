import { HttpResponse } from 'msw'

import {
  newsletterRequestSchema,
  type HealthResponse,
  type NewsletterResponse,
} from '@/contracts/system'

import { mutate, db } from '../db/store'
import { getScenario } from '../scenarios/active'

import { parseBody, route } from './http'

export const systemHandlers = [
  route('get', '/health', () =>
    HttpResponse.json<HealthResponse>({
      status: 'ok',
      serverTime: new Date().toISOString(),
      scenario: getScenario().id,
    }),
  ),

  route('post', '/newsletter', async ({ request }) => {
    const parsed = await parseBody(request, newsletterRequestSchema)
    if ('response' in parsed) return parsed.response
    const email = parsed.data.email.toLowerCase()
    const alreadySubscribed = db().newsletter.includes(email)
    if (!alreadySubscribed) mutate((draft) => void draft.newsletter.push(email))
    return HttpResponse.json<NewsletterResponse>(
      { email, alreadySubscribed },
      { status: alreadySubscribed ? 200 : 201 },
    )
  }),
]

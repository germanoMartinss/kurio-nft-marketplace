import { realtimeHandler } from '../socket/server'

import { systemHandlers } from './system'

export const handlers = [...systemHandlers, realtimeHandler]

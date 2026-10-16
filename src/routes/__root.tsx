import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import type { RouterContext } from '@/app/router'
import { NotFound } from '@/components/common/not-found'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
  notFoundComponent: NotFound,
})

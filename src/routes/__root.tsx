import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import type { RouterContext } from '@/app/router'
import { NotFound } from '@/components/common/not-found'
import { AppShell } from '@/components/layout/app-shell'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <TooltipProvider>
      <AppShell>
        <Outlet />
      </AppShell>
      <Toaster position="top-right" />
    </TooltipProvider>
  )
}

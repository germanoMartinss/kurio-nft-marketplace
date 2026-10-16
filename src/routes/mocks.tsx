import { createFileRoute } from '@tanstack/react-router'

import { MockPanel } from '@/mocks/devtools/mock-panel'

export const Route = createFileRoute('/mocks')({
  component: MockPanel,
})

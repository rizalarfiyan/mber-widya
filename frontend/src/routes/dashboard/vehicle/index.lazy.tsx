import DashboardPage from './-page'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/vehicle/')({
  component: DashboardPage,
})

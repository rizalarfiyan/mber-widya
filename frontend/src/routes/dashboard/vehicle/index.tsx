import DashboardPage from './-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/vehicle/')({
  component: DashboardPage,
})

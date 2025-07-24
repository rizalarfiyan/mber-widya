import Dashboard from '@/layouts/dashboard'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard')({
  component: Dashboard,
})

import AuthLayout from '@/layouts/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

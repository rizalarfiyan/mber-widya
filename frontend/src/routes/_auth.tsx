import AuthLayout from '@/layouts/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context?.user) return
    throw redirect({
      to: '/dashboard',
      replace: true,
    })
  },
  component: AuthLayout,
})

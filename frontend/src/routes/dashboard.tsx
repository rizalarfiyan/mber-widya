import { MESSAGE_MUST_BE_LOGGED_IN } from '@/constants'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (context?.user) return
    toast.error(MESSAGE_MUST_BE_LOGGED_IN)
    throw redirect({
      to: '/login',
      replace: true,
      state: {
        redirectTo: location.href,
      },
    })
  },
})

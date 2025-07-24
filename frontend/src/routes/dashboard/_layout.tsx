import { MESSAGE_MUST_BE_LOGGED_IN } from '@/constants'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

function Layout() {
  return <Outlet />
}

export const Route = createFileRoute('/dashboard/_layout')({
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
  component: () => <Layout />,
})

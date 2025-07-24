import LoadingScreen from '@/components/loading-screen'
import NotFound from '@/components/not-found'
import { routeTree } from '@/routeTree.gen'
import useAuth from '@/store/use-auth'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

const router = createRouter({
  routeTree,
  context: {
    user: undefined,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPendingMinMs: 0,
  defaultPendingComponent: () => <LoadingScreen />,
  defaultNotFoundComponent: NotFound,
  notFoundMode: 'root',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface HistoryState {
    redirectTo?: string
  }
}

const Route = () => {
  const user = useAuth(useShallow(state => state.user))
  return <RouterProvider router={router} context={{ user }} />
}

export default Route

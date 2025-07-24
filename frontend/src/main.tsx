import '@/assets/styles/tailwind.css'
import { routeTree } from './routeTree.gen'
import LoadingScreen from '@/components/loading-screen'
import NotFound from '@/components/not-found'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'

const router = createRouter({
  routeTree,
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
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}

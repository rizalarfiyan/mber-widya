import LoadingScreen from '@/components/loading-screen'
import useAuth from '@/store/use-auth'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

function Auth({ children }: React.PropsWithChildren) {
  const [isLoading, fetchMe] = useAuth(useShallow(state => [state.isLoading, state.fetchMe]))

  useEffect(() => {
    fetchMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <LoadingScreen reason="Validating session..." />
  }

  return children
}

export default Auth

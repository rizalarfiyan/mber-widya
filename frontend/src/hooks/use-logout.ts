import useAuth from '@/store/use-auth'
import useConfirmation from '@/store/use-confirmation'
import { useNavigate } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

const useLogout = () => {
  const logout = useAuth(useShallow(state => state.logout))
  const confirm = useConfirmation()
  const navigate = useNavigate()

  return (e: React.MouseEvent) => {
    e.preventDefault()
    confirm.create({
      title: 'Are you sure?',
      description: 'Make sure you want to logout from your account.',
      confirmText: 'Yes, Logout',
      onConfirm: async ({ setConfirmLoading, close }) => {
        setConfirmLoading(true)
        await logout().finally(() => {
          navigate({
            to: '/login',
            replace: true,
          })
          close()
        })
      },
    })
  }
}

export default useLogout

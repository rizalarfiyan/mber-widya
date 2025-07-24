import ToggleDarkMode from '@/components/toggle-dark-mode'
import { Button } from '@/components/ui/button'
import UserNav from '@/components/user-nav'
import Logo from '@/logo'
import useAuth from '@/store/use-auth'
import { Link } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

const Header = () => {
  const user = useAuth(useShallow(state => state.user))

  return (
    <header className="w-full border-b-2 border-orange-600 shadow-2xl dark:border-orange-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Logo className="text-orange-600 dark:text-white" />
        <div className="flex gap-3">
          <ToggleDarkMode />
          <Button asChild variant="default">
            {!user && <Link to="/login">Login</Link>}
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default Header

import { Button } from '@/components/ui/button'
import Logo from '@/logo'
import useAuth from '@/store/use-auth'
import { Link } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

const Header = () => {
  const user = useAuth(useShallow(state => state.user))

  return (
    <header className="shadow-smooth w-full bg-orange-600 text-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Logo className="text-white dark:text-white" />
        <Button asChild variant="default">
          {user ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Login</Link>}
        </Button>
      </div>
    </header>
  )
}

export default Header

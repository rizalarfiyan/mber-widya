import { Button } from '@/components/ui/button'
import Logo from '@/logo'
import { Link } from '@tanstack/react-router'

const Header = () => (
  <header className="shadow-smooth w-full bg-orange-600 text-white">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <Logo className="text-white dark:text-white" />
      <Button asChild variant="default">
        <Link to="/login">Login</Link>
      </Button>
    </div>
  </header>
)

export default Header

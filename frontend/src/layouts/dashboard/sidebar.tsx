import Logo from '@/components/logo'
import LogoOnly from '@/components/logo-only'
import { Button } from '@/components/ui/button'
import Menu from '@/layouts/dashboard/menu'
import SidebarToggle from '@/layouts/dashboard/sidebar-toggle'
import { useSidebar } from '@/store/use-sidebar'
import { cn } from '@/utils/class-name'
import { Link } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

const Sidebar = () => {
  const [isOpen, toggleOpen] = useSidebar(useShallow(state => [state.isOpen, state.toggleOpen]))

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        !isOpen ? 'w-[90px]' : 'w-72',
      )}>
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div className="shadow-smooth relative flex h-full flex-col overflow-y-auto px-3 py-4">
        <Button variant="link" asChild className="h-14 overflow-hidden">
          <Link to="/dashboard">
            {!isOpen ? (
              <LogoOnly className="size-10 dark:text-white" />
            ) : (
              <Logo className="size-10 w-auto dark:text-white" />
            )}
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  )
}

export default Sidebar

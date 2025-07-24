import { SheetMenu } from '@/components/admin-panel/sheet-menu'
import UserNav from '@/components/admin-panel/user-nav'
import ToggleDarkMode from '@/components/toggle-dark-mode'

interface NavbarProps {
  title: string
}

const Navbar = ({ title }: NavbarProps) => (
  <header className="shadow-smooth sticky top-0 z-10 w-full bg-white dark:bg-slate-800">
    <div className="mx-4 flex h-14 items-center sm:mx-8">
      <div className="flex items-center space-x-4 lg:space-x-0">
        <SheetMenu />
        <h1 className="font-bold">{title}</h1>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <ToggleDarkMode />
        <UserNav />
      </div>
    </div>
  </header>
)

export default Navbar

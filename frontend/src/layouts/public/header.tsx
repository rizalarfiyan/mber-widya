import Logo from '@/logo'

const Header = () => (
  <header className="shadow-smooth w-full bg-orange-600 text-white">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <Logo className="text-white dark:text-white" />
      <div>Dashboard</div>
    </div>
  </header>
)

export default Header

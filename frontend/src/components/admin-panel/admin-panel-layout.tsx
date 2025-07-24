import Footer from '@/components/admin-panel/footer'
import Sidebar from '@/components/admin-panel/sidebar'
import { useSidebar } from '@/store/use-sidebar'
import { cn } from '@/utils/class-name'
import { useShallow } from 'zustand/react/shallow'

const AdminPanelLayout = ({ children }: React.PropsWithChildren) => {
  const isOpen = useSidebar(useShallow(state => state.isOpen))

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out',
          !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}>
        {children}
      </main>
      <footer
        className={cn('transition-[margin-left] duration-300 ease-in-out', !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72')}>
        <Footer />
      </footer>
    </>
  )
}

export default AdminPanelLayout

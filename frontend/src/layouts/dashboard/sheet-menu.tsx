import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { APP_NAME } from '@/constants'
import Menu from '@/layouts/dashboard/menu'
import { Link } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'

const SheetMenu = () => (
  <Sheet>
    <SheetTrigger className="lg:hidden" asChild>
      <Button className="h-8" variant="outline" size="icon">
        <MenuIcon size={20} />
      </Button>
    </SheetTrigger>
    <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
      <SheetHeader>
        <Button className="flex items-center justify-center pt-1 pb-2" variant="link" asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <Logo className="mx-auto size-10 w-auto" />
            <SheetTitle className="sr-only">{APP_NAME}</SheetTitle>
          </Link>
        </Button>
      </SheetHeader>
      <Menu isOpen />
    </SheetContent>
  </Sheet>
)

export default SheetMenu

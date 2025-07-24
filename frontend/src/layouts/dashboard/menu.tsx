import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MENU } from '@/constants/menu'
import CollapseMenuButton from '@/layouts/dashboard/collapse-menu-button'
import MenuGroupLabel from '@/layouts/dashboard/menu-group-label'
import MenuItem from '@/layouts/dashboard/menu-item'
import { cn } from '@/utils/class-name'
import { LogOut } from 'lucide-react'

interface MenuProps {
  isOpen: boolean | undefined
}

const Menu = ({ isOpen }: MenuProps) => (
  <ScrollArea className="[&>div>div[style]]:!block">
    <nav className="mt-4 h-full w-full">
      <ul className="flex min-h-[calc(100vh-48px-36px-16px-16px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-16px)]">
        {MENU.map(({ groupLabel, menus }, index) => (
          <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
            <MenuGroupLabel label={groupLabel} isOpen={isOpen} />
            {menus.map(menu =>
              !menu.submenus || menu.submenus.length === 0 ? (
                <MenuItem key={menu.href} href={menu.href} label={menu.label} icon={menu.icon} isOpen={isOpen} />
              ) : (
                <CollapseMenuButton
                  key={menu.href}
                  icon={menu.icon}
                  label={menu.label}
                  submenus={menu.submenus}
                  isOpen={isOpen}
                />
              ),
            )}
          </li>
        ))}

        <li className="flex w-full grow items-end">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button onClick={() => {}} variant="outline" className="mt-5 h-10 w-full justify-center">
                  <span className={cn(isOpen === false ? '' : 'mr-1')}>
                    <LogOut size={18} />
                  </span>
                  <p className={cn('whitespace-nowrap', isOpen === false ? 'hidden' : '')}>Sign out</p>
                </Button>
              </TooltipTrigger>
              {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  </ScrollArea>
)

export default Menu

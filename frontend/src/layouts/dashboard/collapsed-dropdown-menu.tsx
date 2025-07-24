import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/utils/class-name'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { Link, useMatchRoute } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

interface CollapsedDropdownMenuProps {
  icon: LucideIcon
  label: string
  isSubmenuActive: boolean
  submenus: Submenu[]
}

const CollapsedDropdownMenu = ({ icon: Icon, label, isSubmenuActive, submenus }: CollapsedDropdownMenuProps) => {
  const matchRoute = useMatchRoute()

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant={isSubmenuActive ? 'secondary' : 'ghost'} className="mb-1 h-10 w-full">
                <Icon size={18} />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label, active }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link to={href} className={cn('cursor-pointer', (active ?? matchRoute({ to: href })) && 'bg-secondary')}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CollapsedDropdownMenu

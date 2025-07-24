import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/utils/class-name'
import { Link, useMatchRoute } from '@tanstack/react-router'

interface MenuItemProps {
  href: string
  label: string
  icon: React.ElementType
  isOpen: boolean | undefined
  active?: boolean
}

const MenuItem = ({ href, label, icon: Icon, isOpen, active }: MenuItemProps) => {
  const matchRoute = useMatchRoute()
  const isActive = active ?? !!matchRoute({ to: href, fuzzy: true })

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant={isActive ? 'secondary' : 'ghost'} className="mb-1 h-10 w-full justify-start" asChild>
            <Link to={href}>
              <span className={cn(isOpen === false ? '' : 'mr-1')}>
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  'max-w-[200px] truncate transition-all duration-300',
                  isOpen === false ? '-translate-x-96 opacity-0' : 'translate-x-0 opacity-100',
                )}>
                {label}
              </p>
            </Link>
          </Button>
        </TooltipTrigger>
        {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}

export default MenuItem

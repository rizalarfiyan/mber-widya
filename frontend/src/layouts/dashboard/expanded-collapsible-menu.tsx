import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { ChevronDown, Dot } from 'lucide-react'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

interface ExpandedCollapsibleMenuProps {
  icon: LucideIcon
  label: string
  isSubmenuActive: boolean
  submenus: Submenu[]
}

const ExpandedCollapsibleMenu = ({ icon: Icon, label, isSubmenuActive, submenus }: ExpandedCollapsibleMenuProps) => {
  const matchRoute = useMatchRoute()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive)

  return (
    <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
      <CollapsibleTrigger className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180" asChild>
        <Button variant={isSubmenuActive ? 'secondary' : 'ghost'} className="h-10 w-full justify-start">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p className="max-w-[150px] truncate">{label}</p>
            </div>
            <ChevronDown size={18} className="transition-transform duration-200" />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            variant={(active ?? matchRoute({ to: href })) ? 'secondary' : 'ghost'}
            className="mb-1 h-10 w-full justify-start"
            asChild>
            <Link to={href}>
              <span className="ml-4">
                <Dot size={18} />
              </span>
              <p className="max-w-[170px] truncate">{label}</p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default ExpandedCollapsibleMenu

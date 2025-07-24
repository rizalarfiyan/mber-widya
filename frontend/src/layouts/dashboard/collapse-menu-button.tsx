import CollapsedDropdownMenu from '@/layouts/dashboard/collapsed-dropdown-menu'
import ExpandedCollapsibleMenu from '@/layouts/dashboard/expanded-collapsible-menu'
import { useMatchRoute } from '@tanstack/react-router'
import { memo, useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

interface CollapseMenuButtonProps {
  icon: LucideIcon
  label: string
  submenus: Submenu[]
  isOpen: boolean | undefined
}

const CollapseMenuButton = memo(({ icon, label, submenus, isOpen }: CollapseMenuButtonProps) => {
  const matchRoute = useMatchRoute()

  const isSubmenuActive = useMemo(
    () => submenus.some(submenu => submenu.active ?? matchRoute({ to: submenu.href })),
    [submenus, matchRoute],
  )

  const MenuComponent = isOpen ? ExpandedCollapsibleMenu : CollapsedDropdownMenu

  return <MenuComponent icon={icon} label={label} submenus={submenus} isSubmenuActive={isSubmenuActive} />
})

export default CollapseMenuButton

import { LayoutGrid, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export const MENU: Group[] = [
  {
    groupLabel: '',
    menus: [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutGrid,
        submenus: [],
      },
    ],
  },
  {
    groupLabel: 'Apps',
    menus: [
      {
        href: '/dashboard/vehicle',
        label: 'Vehicle',
        icon: Truck,
      },
    ],
  },
]

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SidebarStore = {
  isOpen: boolean
  toggleOpen: () => void
}

export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      isOpen: true,
      toggleOpen: () => {
        set({ isOpen: !get().isOpen })
      },
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

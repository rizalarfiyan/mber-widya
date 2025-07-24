import { KEY_THEME } from '@/constants'
import { create } from 'zustand'

interface ThemeState {
  isDarkMode: boolean
}

interface ThemeActions {
  toggleDarkMode: () => void
}

const useTheme = create<ThemeState & ThemeActions>((set, get) => ({
  isDarkMode: window.localStorage?.getItem(KEY_THEME) === 'dark',
  toggleDarkMode: () => {
    const newIsDarkMode = !get().isDarkMode
    document.documentElement.classList.toggle('dark', newIsDarkMode)
    localStorage.setItem(KEY_THEME, newIsDarkMode ? 'dark' : 'light')
    set({ isDarkMode: newIsDarkMode })
  },
}))

export default useTheme

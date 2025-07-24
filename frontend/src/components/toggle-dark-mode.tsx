import { Button } from '@/components/ui/button'
import useTheme from '@/store/use-theme'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

function ToggleDarkMode() {
  const toggleDarkMode = useTheme(useShallow(state => state.toggleDarkMode))

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <Button className="bg-background mr-2 size-9 rounded-full" variant="outline" size="icon" onClick={onToggleDarkMode}>
      <SunIcon className="scale-0 rotate-90 transition-transform duration-500 ease-in-out dark:scale-100 dark:rotate-0" />
      <MoonIcon className="absolute scale-100 rotate-0 transition-transform duration-500 ease-in-out dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">Switch Theme</span>
    </Button>
  )
}

export default ToggleDarkMode

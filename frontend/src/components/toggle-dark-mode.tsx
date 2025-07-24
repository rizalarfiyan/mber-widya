import { Button } from '@/components/ui/button'
import useTheme from '@/store/use-theme'
import { Moon, Sun } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

type ToggleDarkModeProps = {
  className?: string
}

const ToggleDarkMode = ({ className }: ToggleDarkModeProps) => {
  const [isDarkMode, toggleDarkMode] = useTheme(useShallow(state => [state.isDarkMode, state.toggleDarkMode]))

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <Button size="icon" variant="outline" type="button" className={className} onClick={onToggleDarkMode}>
      {isDarkMode ? <Sun /> : <Moon className="size-5" />}
    </Button>
  )
}

export default ToggleDarkMode

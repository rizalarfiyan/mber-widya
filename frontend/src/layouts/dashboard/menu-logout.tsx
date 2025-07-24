import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useAuth from '@/store/use-auth'
import { cn } from '@/utils/class-name'
import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

interface MenuLogoutButtonProps {
  isOpen: boolean | undefined
}

const MenuLogoutButton = ({ isOpen }: MenuLogoutButtonProps) => {
  const logout = useAuth(useShallow(state => state.logout))
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout().finally(() => {
      navigate({
        to: '/login',
        replace: true,
      })
    })
  }

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button onClick={handleLogout} variant="outline" className="mt-5 h-10 w-full justify-center">
            <span className={cn(isOpen === false ? '' : 'mr-1')}>
              <LogOut size={18} />
            </span>
            <p className={cn('whitespace-nowrap', isOpen === false ? 'hidden' : '')}>Sign out</p>
          </Button>
        </TooltipTrigger>
        {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}

export default MenuLogoutButton

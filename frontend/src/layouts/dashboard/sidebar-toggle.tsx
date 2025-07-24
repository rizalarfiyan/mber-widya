import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name'
import { ChevronLeft } from 'lucide-react'

interface SidebarToggleProps {
  isOpen: boolean | undefined
  setIsOpen?: () => void
}

const SidebarToggle = ({ isOpen, setIsOpen }: SidebarToggleProps) => (
  <div className="invisible absolute top-[18px] -right-15 z-20 lg:visible">
    <Button onClick={() => setIsOpen?.()} className="size-9 rounded-md" variant="outline" size="icon">
      <ChevronLeft
        className={cn(
          'size-5 transition-transform duration-700 ease-in-out',
          isOpen === false ? 'rotate-180' : 'rotate-0',
        )}
      />
    </Button>
  </div>
)

export default SidebarToggle

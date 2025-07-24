import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Ellipsis } from 'lucide-react'

interface MenuGroupLabelProps {
  label: string
  isOpen: boolean | undefined
}

const MenuGroupLabel = ({ label, isOpen }: MenuGroupLabelProps) => {
  if (!label) return <p className="pb-2"></p>

  if (isOpen || isOpen === undefined) {
    return <p className="text-muted-foreground max-w-[248px] truncate px-4 pb-2 text-sm font-medium">{label}</p>
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger className="w-full">
          <div className="flex w-full items-center justify-center">
            <Ellipsis className="h-5 w-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default MenuGroupLabel

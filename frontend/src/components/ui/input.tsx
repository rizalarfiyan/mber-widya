import { cn } from '@/utils/class-name'
import type { LucideIcon } from 'lucide-react'

interface InputProps extends React.ComponentProps<'input'> {
  wrapperClassName?: string
  leftIcon?: LucideIcon
  leftAction?: React.ReactNode
  rightIcon?: LucideIcon
  rightAction?: React.ReactNode
}

function Input({
  wrapperClassName,
  className,
  type,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftAction,
  rightAction,
  ...props
}: InputProps) {
  return (
    <div className={cn('relative', wrapperClassName)}>
      {leftAction}
      {LeftIcon && <LeftIcon className="text-muted-foreground absolute inset-x-2.5 inset-y-2.5 size-5" />}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          (LeftIcon || leftAction) && 'pl-9',
          (RightIcon || rightAction) && 'pr-9',
          className,
        )}
        {...props}
      />
      {RightIcon && <RightIcon className="text-muted-foreground absolute inset-x-2.5 inset-y-2.5 size-5" />}
      {rightAction}
    </div>
  )
}

export { Input }

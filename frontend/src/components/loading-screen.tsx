import Logo from '@/components/logo'
import { cn } from '@/utils/class-name'

type LoadingScreenProps = React.HTMLAttributes<HTMLDivElement> & {
  reason?: string
}

const LoadingScreen = ({ className, reason = 'Loading app...', ...rest }: LoadingScreenProps) => (
  <div
    className={cn(
      'fixed inset-0 z-50 mx-auto flex h-full min-h-screen w-full items-center justify-center bg-white dark:bg-slate-800',
      className,
    )}
    {...rest}>
    <div className="flex flex-col items-center gap-3">
      <Logo className="h-14 dark:text-orange-300" />
      <div className="relative mt-2 h-2 w-32 overflow-hidden rounded-full bg-orange-200 dark:bg-orange-200/40">
        <div className="animate-loading-move absolute top-0 left-0 h-full w-1/2 bg-orange-600 dark:bg-orange-300" />
      </div>
      <p className="text-center text-slate-600 dark:text-slate-300">{reason}</p>
    </div>
  </div>
)

export default LoadingScreen

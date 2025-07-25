import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import useConfirmation from '@/store/use-confirmation'
import { Loader2, OctagonAlert } from 'lucide-react'

const Confirmation = () => {
  const { config, isOpen, isConfirmLoading, isCancelLoading, close, setConfirmLoading, setCancelLoading } =
    useConfirmation()

  const handleCancel = () => {
    if (config?.onCancel) {
      config.onCancel({ close, setConfirmLoading, setCancelLoading })
    } else {
      close()
    }
  }

  const handleConfirm = () => {
    if (config?.onConfirm) {
      config.onConfirm({ close, setConfirmLoading, setCancelLoading })
    } else {
      close()
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="py-6">
          <OctagonAlert className="text-primary mx-auto size-16" />
          <AlertDialogTitle className="text-primary text-center text-2xl font-bold">{config?.title}</AlertDialogTitle>
          {config?.description && (
            <AlertDialogDescription className="mx-auto max-w-xs text-center">
              {config?.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center sm:justify-center">
          <AlertDialogCancel onClick={handleCancel} disabled={isConfirmLoading || isCancelLoading}>
            {isCancelLoading && <Loader2 className="mr-2 animate-spin" />}
            <span>{config?.cancelText ?? 'Cancel'}</span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isConfirmLoading || isCancelLoading}>
            {isConfirmLoading && <Loader2 className="mr-2 animate-spin" />}
            <span>{config?.confirmText ?? 'Confirm'}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Confirmation

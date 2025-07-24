import { MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_UNAUTHORIZED } from '@/constants'
import { ErrorAuthorization, ErrorValidation } from '@/utils/exception'
import { toast } from 'sonner'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const apiErrorHandler = <T extends FieldValues>(error: Error, form: UseFormReturn<T> | null = null) => {
  if (error instanceof ErrorAuthorization) {
    toast.error(error?.message ?? MESSAGE_UNAUTHORIZED)
    return
  }

  if (error instanceof ErrorValidation) {
    if (!form) return
    const errors = error.getData()
    if (errors.length === 0) return
    for (const { key, value } of errors) {
      form.setError(key as Path<T>, {
        type: 'manual',
        message: value,
      })
    }
    return
  }

  if (form) form.reset()
  toast.error(error?.message ?? MESSAGE_INTERNAL_SERVER_ERROR)
}

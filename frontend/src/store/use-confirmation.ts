import { create } from 'zustand'

interface ConfirmationConfig {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onCancel?: (actions: ConfirmationActions) => Promise<void>
  onConfirm?: (actions: ConfirmationActions) => Promise<void>
}

interface ConfirmationActions {
  setConfirmLoading: (isLoading: boolean) => void
  setCancelLoading: (isLoading: boolean) => void
  close: () => void
}

interface ConfirmationState {
  config?: ConfirmationConfig
  isOpen: boolean
  isConfirmLoading: boolean
  isCancelLoading: boolean
  create: (config: ConfirmationConfig) => void
  close: () => void
  setConfirmLoading: (isLoading: boolean) => void
  setCancelLoading: (isLoading: boolean) => void
}

const useConfirmation = create<ConfirmationState>(set => ({
  config: undefined,
  isOpen: false,
  isConfirmLoading: false,
  isCancelLoading: false,
  create: (config: ConfirmationConfig) => {
    set({
      config,
      isOpen: true,
      isConfirmLoading: false,
      isCancelLoading: false,
    })
  },
  close: () => {
    set({ isOpen: false })
    const timeout = setTimeout(() => {
      set({ config: undefined, isConfirmLoading: false, isCancelLoading: false })
      clearTimeout(timeout)
    }, 200)
  },
  setConfirmLoading: (isLoading: boolean) => {
    set({ isConfirmLoading: isLoading })
  },
  setCancelLoading: (isLoading: boolean) => {
    set({ isCancelLoading: isLoading })
  },
}))

export default useConfirmation

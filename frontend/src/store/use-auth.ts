import { KEY_ACCESS_TOKEN, MESSAGE_SESSION_EXPIRED } from '@/constants'
import axios from '@/utils/axios'
import { toast } from 'sonner'
import { create } from 'zustand'
import type { IAuthUser } from '@/types/auth'
import type { BaseResponse } from '@/types/response'

interface AuthState {
  user?: IAuthUser
  isLoading: boolean
}

interface AuthActions {
  fetchMe: () => Promise<void>
  login: (user: IAuthUser, token: string) => Promise<void>
  logout: () => Promise<void>
}

const useAuth = create<AuthState & AuthActions>((set, get) => ({
  user: undefined,
  isLoading: !!localStorage.getItem(KEY_ACCESS_TOKEN),
  fetchMe: async () => {
    if (!localStorage.getItem(KEY_ACCESS_TOKEN)) {
      set({ isLoading: false })
      return
    }

    if (!get().isLoading) set({ isLoading: true })
    try {
      const { data } = await axios.get<BaseResponse<IAuthUser>>('/auth/me')
      set({ user: data.data, isLoading: false })
    } catch {
      toast.error(MESSAGE_SESSION_EXPIRED)
      localStorage.removeItem(KEY_ACCESS_TOKEN)
      set({ user: undefined, isLoading: false })
    }
  },
  login: async (user, token) => {
    localStorage.setItem(KEY_ACCESS_TOKEN, token)
    set({ user })
  },
  logout: async () => {
    localStorage.removeItem(KEY_ACCESS_TOKEN)
    set({ user: undefined })
  },
}))

export default useAuth

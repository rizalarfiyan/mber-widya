import type { USER_ROLE } from '@/constants'

export type IAuthRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export interface IAuthUser {
  id: string
  email: string
  name: string
  role: IAuthRole
}

export interface IAuthLogin {
  token: string
  user: IAuthUser
}

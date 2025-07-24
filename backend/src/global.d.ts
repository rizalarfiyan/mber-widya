import { Auth } from '@/api/auth/auth-model'

declare global {
  declare namespace Express {
    interface Locals {
      user?: Auth
    }

    interface Response {
      locals: Locals
    }
  }
}

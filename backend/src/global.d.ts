import { Auth } from '@/api/auth/auth-model'

declare global {
  declare namespace Express {
    interface Locals {
      user?: Auth
    }

    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryData?: Record<string, any>
    }

    interface Response {
      locals: Locals
    }
  }
}

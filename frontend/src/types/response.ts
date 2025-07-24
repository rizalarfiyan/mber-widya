import type { HttpStatusCode } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseResponse<V = any> = {
  code: HttpStatusCode
  message: string
  data: V
}

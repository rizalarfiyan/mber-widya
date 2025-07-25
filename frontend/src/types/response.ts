/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HttpStatusCode } from 'axios'

export type BaseResponse<V = any> = {
  code: HttpStatusCode
  message: string
  data: V
}

export type BaseResponsePagination<T = any> = BaseResponse<{
  content: T[]
  meta: {
    page: number
    limit: number
    total: number
    total_page: number
  }
}>

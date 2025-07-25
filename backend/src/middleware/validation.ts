import { ServiceResponse } from '@/models/response'
import { handleResponse } from '@/utils/http-handler'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { ZodError, ZodObject } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validation = <T extends ZodObject<any>>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({ body: req.body, query: req.query, params: req.params })
      if (parsed?.query) {
        Object.assign(req, { queryData: parsed.query })
      }
      next()
    } catch (err) {
      const zodError = err as ZodError
      const isBodyOrParamsError = zodError.issues.some(issue => issue.path[0] === 'body' || issue.path[0] === 'params')

      let errorMessage: string
      let errorData: Array<{ key: string; value: string }> | null = null

      if (isBodyOrParamsError) {
        errorMessage = 'Invalid Request'
        errorData = zodError.issues.map(issue => ({
          key: issue.path.slice(1).join('.'),
          value: issue.message,
        }))
      } else {
        const firstIssue = zodError.issues[0]
        const fieldPath = firstIssue.path.length > 0 ? firstIssue.path.join('.') : 'root'
        errorMessage = `Invalid input: ${fieldPath}: ${firstIssue.message}`
      }

      const response = ServiceResponse.failure(errorMessage, errorData, StatusCodes.BAD_REQUEST)
      handleResponse(response, res)
    }
  }
}

export default validation

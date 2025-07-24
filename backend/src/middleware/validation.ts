import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { ZodError, ZodType } from 'zod'
import { ServiceResponse } from '@/models/response'
import { handleResponse } from '@/utils/http-handler'

const validation = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params })
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
export default validation

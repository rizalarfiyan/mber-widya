import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, ZodSchema } from 'zod/v3'
import { ServiceResponse } from '@/models/response'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse)
}

const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params })
    next()
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map(e => e.message).join(', ')}`
    const statusCode = StatusCodes.BAD_REQUEST
    res.status(statusCode).send(ServiceResponse.failure(errorMessage, null, statusCode))
  }
}

export { handleResponse, validateRequest }

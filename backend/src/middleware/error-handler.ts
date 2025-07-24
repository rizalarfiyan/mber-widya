import { ErrorRequestHandler, RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ServiceResponse } from '@/models/response'
import { logger } from '@/server'
import { handleResponse } from '@/utils/http-handler'
import { AppError } from '@/models/error'
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library'

const notFoundHandler: RequestHandler = (_req, res) => {
  const response = ServiceResponse.success('Page Not Found', null, StatusCodes.NOT_FOUND)
  handleResponse(response, res)
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err, { message: err.message, url: req.originalUrl, method: req.method })

  if (err instanceof AppError) {
    const response = ServiceResponse.failure(err.message, null, err.getStatusCodes())
    handleResponse(response, res)
  } else if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
    const response = ServiceResponse.failure('Record not found', null, StatusCodes.UNPROCESSABLE_ENTITY)
    handleResponse(response, res)
  } else {
    const response = ServiceResponse.failure(
      err.message || 'Internal server error',
      null,
      err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    )
    handleResponse(response, res)
  }

  next(err)
}

export default [notFoundHandler, errorHandler]

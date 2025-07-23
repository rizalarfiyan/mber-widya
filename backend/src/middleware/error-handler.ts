import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/models/response'
import { logger } from '@/server'
import { handleResponse } from '@/utils/http-handler'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err, { message: err.message, url: req.originalUrl, method: req.method })

  const errorRes = ServiceResponse.failure(
    err.message || 'Internal server error',
    null,
    err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  )

  handleResponse(errorRes, res)

  next(err)
}

export default errorHandler

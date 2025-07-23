import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ResponseStatus, ServiceResponse } from '@/models/response'
import { handleResponse } from '@/utils/http-handler'
import { logger } from '@/server'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err, { message: err.message, url: req.originalUrl, method: req.method })

  const errorRes = new ServiceResponse({
    status: ResponseStatus.Failed,
    message: err.message || 'Internal server error',
    data: null,
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  })

  handleResponse(errorRes, res)

  next(err)
}

export default errorHandler

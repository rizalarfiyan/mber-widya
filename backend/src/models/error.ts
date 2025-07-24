import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export class AppError extends Error {
  private readonly statusCodes: StatusCodes

  constructor(statusCodes = StatusCodes.INTERNAL_SERVER_ERROR, message?: string) {
    if (!message) message = getReasonPhrase(statusCodes)
    super(message)
    this.statusCodes = statusCodes
  }

  getErrors() {
    return this.message
  }

  getStatusCodes() {
    return this.statusCodes
  }
}

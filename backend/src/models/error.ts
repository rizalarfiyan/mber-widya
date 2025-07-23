import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export class AppError extends Error {
  private readonly statusCodes: StatusCodes

  constructor(message?: string, statusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
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

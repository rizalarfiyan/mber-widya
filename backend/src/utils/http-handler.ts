import { ServiceResponse } from '@/models/response'
import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse)
}

export { handleResponse }

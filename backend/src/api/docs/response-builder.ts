import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import { ServiceResponseSchema } from '@/models/response'

const responseBuilder = (schema: z.ZodTypeAny, description: string, statusCode = StatusCodes.OK) => {
  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema: ServiceResponseSchema(schema),
        },
      },
    },
  }
}

const responsePaginationBuilder = (schema: z.ZodTypeAny, description: string, statusCode = StatusCodes.OK) => {
  const paginationSchema = z.object({
    content: z.array(schema),
    meta: z.object({
      page: z.number().int().min(1),
      limit: z.number().int().min(1),
      total: z.number().int().min(0),
      total_page: z.number().int().min(1),
    }),
  })
  return responseBuilder(paginationSchema, description, statusCode)
}

export default responseBuilder
export { responsePaginationBuilder }

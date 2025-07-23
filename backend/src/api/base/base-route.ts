import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { Router, type Request, type Response } from 'express'
import { z } from 'zod'

import responseBuilder from '@/api/docs/response-builder'
import { ServiceResponse } from '@/models/response'
import { Home, HomeSchema } from './base-model'
import { handleResponse } from '@/utils/http-handler'

const baseRegistry = new OpenAPIRegistry()
const baseRouter: Router = Router()

baseRegistry.register('home', HomeSchema)

baseRegistry.registerPath({
  method: 'get',
  path: '/',
  tags: ['Base'],
  responses: responseBuilder(HomeSchema, 'Success'),
})

baseRouter.get('/', (_req: Request, res: Response) => {
  const data: Home = {
    name: 'Muhamad Rizal Arfiyan',
    email: 'rizal.arfiyan.23@gmail.com',
    github: 'https://github.com/rizalarfiyan',
    website: 'https://rizalarfiyan.com',
    linkedin: 'https://www.linkedin.com/in/rizalarfiyan',
  }
  const response = ServiceResponse.success('Welcome to the Widya API', data)
  handleResponse(response, res)
})

baseRegistry.registerPath({
  method: 'get',
  path: '/health',
  tags: ['Base'],
  responses: responseBuilder(z.null(), 'Success'),
})

baseRouter.get('/health', (_req: Request, res: Response) => {
  const response = ServiceResponse.success('Service is healthy', null)
  handleResponse(response, res)
})

export default baseRouter
export { baseRegistry }

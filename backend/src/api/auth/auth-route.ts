import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { Router } from 'express'

import responseBuilder from '@/api/docs/response-builder'
import requestBody from '@/api/docs/request-body'
import authController from './auth-controller'
import { LoginSchema, RequestLoginSchema } from './auth-model'
import validateRequest from '@/middleware/validation'

const authRegistry = new OpenAPIRegistry()
const authRouter: Router = Router()

authRegistry.register('login', LoginSchema)

authRegistry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    body: requestBody(RequestLoginSchema.shape.body),
  },
  responses: responseBuilder(LoginSchema, 'Successfully logged in'),
})

authRouter.post('/login', validateRequest(RequestLoginSchema), authController.login)

export default authRouter
export { authRegistry }

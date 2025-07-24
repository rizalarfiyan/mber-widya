import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { Router } from 'express'
import validation from '@/middleware/validation'
import responseBuilder from '@/api/docs/response-builder'
import requestBody from '@/api/docs/request-body'
import authController from './auth-controller'
import { AuthSchema, LoginSchema, RequestLoginSchema } from './auth-model'
import authentication from '@/middleware/authentication'

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

authRouter.post('/login', validation(RequestLoginSchema), authController.login)

authRegistry.registerPath({
  method: 'get',
  path: '/auth/me',
  tags: ['Auth'],
  security: [{ accessToken: [] }],
  responses: responseBuilder(AuthSchema, 'Successfully get me'),
})

authRouter.get('/me', authentication(), authController.me)

export default authRouter
export { authRegistry }

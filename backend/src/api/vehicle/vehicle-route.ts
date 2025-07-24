import requestBody from '@/api/docs/request-body'
import responseBuilder from '@/api/docs/response-builder'
import validation from '@/middleware/validation'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { Router } from 'express'
import vehicleController from './vehicle-controller'
import { CreateVehicleSchema } from './vehicle-model'
import { z } from 'zod'
import authentication from '@/middleware/authentication'
import { UserRole } from '@/models/base'

const vehicleRegistry = new OpenAPIRegistry()
const vehicleRouter: Router = Router()

vehicleRegistry.registerPath({
  method: 'post',
  path: '/vehicle',
  tags: ['Vehicle'],
  security: [{ accessToken: [] }],
  request: {
    body: requestBody(CreateVehicleSchema.shape.body),
  },
  responses: responseBuilder(z.null(), 'Successfully created vehicle'),
})

vehicleRouter.post('/', authentication(UserRole.ADMIN), validation(CreateVehicleSchema), vehicleController.create)

export default vehicleRouter
export { vehicleRegistry }

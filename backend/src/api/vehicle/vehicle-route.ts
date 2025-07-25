import requestBody from '@/api/docs/request-body'
import responseBuilder, { responsePaginationBuilder } from '@/api/docs/response-builder'
import authentication from '@/middleware/authentication'
import validation from '@/middleware/validation'
import { ParamIdSchema, UserRole } from '@/models/base'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { Router } from 'express'
import { z } from 'zod'
import vehicleController from './vehicle-controller'
import {
  CreateVehicleSchema,
  ListVehicleSchema,
  UpdateVehicleSchema,
  VehicleDetailSchema,
  VehicleSchema,
} from './vehicle-model'

const vehicleRegistry = new OpenAPIRegistry()
const vehicleRouter: Router = Router()

vehicleRegistry.registerPath({
  method: 'get',
  path: '/vehicle',
  tags: ['Vehicle'],
  security: [{ accessToken: [] }],
  request: {
    query: ListVehicleSchema.shape.query,
  },
  responses: responsePaginationBuilder(z.array(VehicleSchema), 'Successfully retrieved vehicle list'),
})

vehicleRouter.get('/', authentication(), validation(ListVehicleSchema), vehicleController.list)

vehicleRegistry.registerPath({
  method: 'get',
  path: '/vehicle/{id}',
  tags: ['Vehicle'],
  security: [{ accessToken: [] }],
  request: {
    params: ParamIdSchema.shape.params,
  },
  responses: responseBuilder(VehicleDetailSchema, 'Successfully retrieved vehicle details'),
})

vehicleRouter.get('/:id', authentication(), validation(ParamIdSchema), vehicleController.detail)

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

vehicleRegistry.registerPath({
  method: 'put',
  path: '/vehicle/{id}',
  tags: ['Vehicle'],
  security: [{ accessToken: [] }],
  request: {
    params: UpdateVehicleSchema.shape.params,
    body: requestBody(UpdateVehicleSchema.shape.body),
  },
  responses: responseBuilder(z.null(), 'Successfully updated vehicle'),
})

vehicleRouter.put('/:id', authentication(UserRole.ADMIN), validation(UpdateVehicleSchema), vehicleController.update)

vehicleRegistry.registerPath({
  method: 'delete',
  path: '/vehicle/{id}',
  tags: ['Vehicle'],
  security: [{ accessToken: [] }],
  request: {
    params: ParamIdSchema.shape.params,
  },
  responses: responseBuilder(z.null(), 'Successfully deleted vehicle'),
})

vehicleRouter.delete('/:id', authentication(UserRole.ADMIN), validation(ParamIdSchema), vehicleController.delete)

export default vehicleRouter
export { vehicleRegistry }

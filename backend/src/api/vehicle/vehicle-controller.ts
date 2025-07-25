import { ServiceResponse } from '@/models/response'
import asyncWrapper from '@/utils/async-wrapper'
import { handleResponse } from '@/utils/http-handler'
import { pick } from '@/utils/object'
import { parseId } from '@/utils/parse'
import type { Request } from 'express'
import vehicleService from './vehicle-service'
import { ListVehicle } from './vehicle-model'

class VehicleController {
  private extractPayload(req: Request) {
    return pick(req.body, ['name', 'status', 'speed', 'fuel_level', 'odometer', 'latitude', 'longitude'])
  }
  list = asyncWrapper(async (req, res) => {
    const vehicles = await vehicleService.list(req.queryData as ListVehicle['query'])
    const response = ServiceResponse.success('Successfully retrieved vehicle list', vehicles)
    handleResponse(response, res)
  })
  detail = asyncWrapper(async (req, res) => {
    const id = parseId(req.params.id)
    const vehicle = await vehicleService.detail(id)
    const response = ServiceResponse.success('Successfully retrieved vehicle details', vehicle)
    handleResponse(response, res)
  })
  create = asyncWrapper(async (req, res) => {
    const payload = this.extractPayload(req)
    await vehicleService.create(payload)
    const response = ServiceResponse.success('Successfully created vehicle', null)
    handleResponse(response, res)
  })
  update = asyncWrapper(async (req, res) => {
    const payload = this.extractPayload(req)
    const id = parseId(req.params.id)
    await vehicleService.update(id, payload)
    const response = ServiceResponse.success('Successfully updated vehicle', null)
    handleResponse(response, res)
  })
  delete = asyncWrapper(async (req, res) => {
    const id = parseId(req.params.id)
    await vehicleService.delete(id)
    const response = ServiceResponse.success('Successfully deleted vehicle', null)
    handleResponse(response, res)
  })
}

const vehicleController = new VehicleController()
export default vehicleController

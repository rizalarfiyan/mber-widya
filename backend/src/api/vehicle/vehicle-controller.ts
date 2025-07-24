import { ServiceResponse } from '@/models/response'
import asyncWrapper from '@/utils/async-wrapper'
import { handleResponse } from '@/utils/http-handler'
import { pick } from '@/utils/object'
import { parseId } from '@/utils/parse'
import type { Request } from 'express'
import vehicleService from './vehicle-service'

class VehicleController {
  private extractPayload(req: Request) {
    return pick(req.body, ['name', 'status', 'speed', 'fuel_level', 'odometer', 'latitude', 'longitude'])
  }
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

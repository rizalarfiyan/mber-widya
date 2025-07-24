import { ServiceResponse } from '@/models/response'
import asyncWrapper from '@/utils/async-wrapper'
import { handleResponse } from '@/utils/http-handler'
import { pick } from '@/utils/object'
import vehicleService from './vehicle-service'

class VehicleController {
  create = asyncWrapper(async (req, res) => {
    const payload = pick(req.body, ['name', 'status', 'speed', 'fuel_level', 'odometer', 'latitude', 'longitude'])
    await vehicleService.create(payload)
    const response = ServiceResponse.success('Successfully created vehicle', null)
    handleResponse(response, res)
  })
}

const vehicleController = new VehicleController()
export default vehicleController

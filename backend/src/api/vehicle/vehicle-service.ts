import { CreateVehicle } from './vehicle-model'
import vehicleRepository from './vehicle-repository'

class VehicleService {
  async create(payload: CreateVehicle['body']): Promise<void> {
    vehicleRepository.create(payload)
  }
}

const vehicleService = new VehicleService()
export default vehicleService

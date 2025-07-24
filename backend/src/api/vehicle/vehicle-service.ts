import { CreateVehicle, UpdateVehicle } from './vehicle-model'
import vehicleRepository from './vehicle-repository'

class VehicleService {
  async create(payload: CreateVehicle['body']): Promise<void> {
    vehicleRepository.create(payload)
  }
  async update(id: number, payload: UpdateVehicle['body']): Promise<void> {
    vehicleRepository.update(id, payload)
  }
}

const vehicleService = new VehicleService()
export default vehicleService

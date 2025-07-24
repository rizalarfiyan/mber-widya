import { CreateVehicle, UpdateVehicle } from './vehicle-model'
import vehicleRepository from './vehicle-repository'

class VehicleService {
  async create(payload: CreateVehicle['body']): Promise<void> {
    await vehicleRepository.create(payload)
  }
  async update(id: number, payload: UpdateVehicle['body']): Promise<void> {
    await vehicleRepository.update(id, payload)
  }
  async delete(id: number): Promise<void> {
    await vehicleRepository.delete(id)
  }
}

const vehicleService = new VehicleService()
export default vehicleService

import { AppError } from '@/models/error'
import { CreateVehicle, UpdateVehicle, VehicleDetail } from './vehicle-model'
import vehicleRepository from './vehicle-repository'
import { StatusCodes } from 'http-status-codes'

class VehicleService {
  async detail(id: number): Promise<VehicleDetail> {
    const data = await vehicleRepository.getById(id)
    if (!data) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Vehicle not found')
    }
    return data
  }
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

import { AppError } from '@/models/error'
import { StatusCodes } from 'http-status-codes'
import { CreateVehicle, ListVehicle, UpdateVehicle, Vehicle, VehicleDetail } from './vehicle-model'
import vehicleRepository from './vehicle-repository'
import { Pagination } from '@/models/base'

class VehicleService {
  async list(payload: ListVehicle['query']): Promise<Pagination<Vehicle>> {
    const { page, limit } = payload
    const [total, data] = await vehicleRepository.list(payload)
    const totalPages = Math.ceil(total / limit)
    return {
      content: data as Vehicle[],
      meta: {
        page,
        limit,
        total,
        total_page: totalPages,
      },
    }
  }
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

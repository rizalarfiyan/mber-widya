import prisma, { Vehicles, Prisma } from '@/libs/prisma'
import { generateSelect } from '@/utils/prisma'
import { ListVehicle } from './vehicle-model'

class VehicleRepository {
  async list(
    payload: ListVehicle['query'],
  ): Promise<[number, Array<Pick<Vehicles, 'id' | 'name' | 'status' | 'speed' | 'updated_at'>>]> {
    const { page, limit, sort, order, search, status } = payload

    const skip = (page - 1) * limit
    const take = limit
    const where: Prisma.VehiclesWhereInput = {}
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      }
    }

    if (status) {
      where.status = status
    }

    const orderBy: Prisma.VehiclesOrderByWithRelationInput = {
      [sort]: order,
    }

    return prisma.$transaction([
      prisma.vehicles.count({ where }),
      prisma.vehicles.findMany({
        skip,
        take,
        where,
        orderBy,
        select: generateSelect(['id', 'name', 'status', 'speed', 'updated_at']),
      }),
    ])
  }
  async getById(id: number): Promise<Vehicles | null>
  async getById<K extends keyof Vehicles>(id: number, keys: ReadonlyArray<K>): Promise<Pick<Vehicles, K> | null>
  async getById<K extends keyof Vehicles>(
    id: number,
    keys?: ReadonlyArray<K>,
  ): Promise<Vehicles | Pick<Vehicles, K> | null> {
    const select = generateSelect(keys)
    return prisma.vehicles.findUnique({
      where: { id },
      select,
    })
  }
  async create(data: Omit<Vehicles, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicles> {
    return prisma.vehicles.create({
      data,
    })
  }
  async update(
    id: number,
    data: Partial<Omit<Vehicles, 'id' | 'created_at' | 'updated_at'>>,
  ): Promise<Vehicles | null> {
    return prisma.vehicles.update({
      where: { id },
      data,
    })
  }
  async delete(id: number): Promise<Vehicles | null> {
    return prisma.vehicles.delete({
      where: { id },
    })
  }
}

const vehicleRepository = new VehicleRepository()
export default vehicleRepository

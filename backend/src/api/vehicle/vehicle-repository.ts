import prisma, { Vehicles } from '@/libs/prisma'
import { generateSelect } from '@/utils/prisma'

class VehicleRepository {
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
}

const vehicleRepository = new VehicleRepository()
export default vehicleRepository

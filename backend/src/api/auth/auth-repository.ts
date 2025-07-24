import prisma, { Users } from '@/libs/prisma'
import { generateSelect } from '@/utils/prisma'

class AuthRepository {
  private async _findUniqueUser<T extends keyof Users>(
    where: { id: number } | { email: string },
    keys?: ReadonlyArray<T>,
  ): Promise<Users | Pick<Users, T> | null> {
    const select = generateSelect(keys)
    return prisma.users.findUnique({
      where,
      select,
    })
  }

  async getByEmail(email: string): Promise<Users | null>
  async getByEmail<K extends keyof Users>(email: string, keys: ReadonlyArray<K>): Promise<Pick<Users, K> | null>
  async getByEmail<K extends keyof Users>(
    email: string,
    keys?: ReadonlyArray<K>,
  ): Promise<Users | Pick<Users, K> | null> {
    return this._findUniqueUser({ email }, keys)
  }

  async getById(id: number): Promise<Users | null>
  async getById<K extends keyof Users>(id: number, keys: ReadonlyArray<K>): Promise<Pick<Users, K> | null>
  async getById<K extends keyof Users>(id: number, keys?: ReadonlyArray<K>): Promise<Users | Pick<Users, K> | null> {
    return this._findUniqueUser({ id }, keys)
  }
}

const authRepository = new AuthRepository()
export default authRepository

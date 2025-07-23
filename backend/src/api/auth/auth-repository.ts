import prisma, { Users } from '@/libs/prisma'

class AuthRepository {
  async getByEmail(email: string, keys?: ReadonlyArray<keyof Users>) {
    return prisma.users.findUnique({
      where: { email },
      select: keys ? Object.fromEntries(keys.map(key => [key, true])) : undefined,
    })
  }
}

const authRepository = new AuthRepository()
export default authRepository

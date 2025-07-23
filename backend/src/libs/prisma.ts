import env from '@/utils/env-config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: env.isDevelopment ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'minimal',
})

export default prisma

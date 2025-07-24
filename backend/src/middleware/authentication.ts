import { Auth, UserRole } from '@/api/auth/auth-model'
import authRepository from '@/api/auth/auth-repository'
import { AppError } from '@/models/error'
import asyncWrapper from '@/utils/async-wrapper'
import { verifyToken } from '@/utils/jwt'
import { StatusCodes } from 'http-status-codes'

const authentication = (...roles: UserRole[]) => {
  return asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')?.[1]
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED)
    }

    const payload = verifyToken(token)
    if (!payload || !payload.sub) {
      throw new AppError(StatusCodes.UNAUTHORIZED)
    }

    const userId = Number(payload.sub)
    if (isNaN(userId)) {
      throw new AppError(StatusCodes.UNAUTHORIZED)
    }

    const user = await authRepository.getById(userId, ['id', 'name', 'email', 'role'])
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED)
    }

    const role = new Set(roles)
    if (roles.length > 0 && !role.has(user.role as UserRole) && user.role !== UserRole.ADMIN) {
      throw new AppError(StatusCodes.FORBIDDEN)
    }

    res.locals.user = user as Auth
    next()
  })
}

export default authentication

import { UserRole } from '@/models/base'
import { AppError } from '@/models/error'
import { compare } from '@/utils/bcrypy'
import { generateToken } from '@/utils/jwt'
import { StatusCodes } from 'http-status-codes'
import { Login } from './auth-model'
import authRepository from './auth-repository'

class AuthService {
  async login(email: string, password: string): Promise<Login> {
    const user = await authRepository.getByEmail(email, ['id', 'name', 'email', 'password', 'role'])
    if (!user || !compare(password, user.password)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    }

    const token = generateToken(user.id)
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
        name: user.name,
      },
    }
  }
}

const authService = new AuthService()
export default authService

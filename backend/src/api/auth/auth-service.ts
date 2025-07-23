import { AppError } from '@/models/error'
import authRepository from './auth-repository'
import { StatusCodes } from 'http-status-codes'
import { compare } from '@/utils/bcrypy'
import { Login } from './auth-model'
import { generateToken } from '@/utils/jwt'

class AuthService {
  async login(email: string, password: string): Promise<Login> {
    const user = await authRepository.getByEmail(email, ['id', 'name', 'email', 'password'])
    if (!user || !compare(password, user.password)) {
      throw new AppError('Invalid email or password', StatusCodes.BAD_REQUEST)
    }

    const token = generateToken(user.id)
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    }
  }
}

const authService = new AuthService()
export default authService

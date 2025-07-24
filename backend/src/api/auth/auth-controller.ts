import { AppError } from '@/models/error'
import asyncWrapper from '@/utils/async-wrapper'
import { handleResponse } from '@/utils/http-handler'
import { StatusCodes } from 'http-status-codes'
import authService from './auth-service'
import { ServiceResponse } from '@/models/response'

const authController = {
  login: asyncWrapper(async (req, res) => {
    const { email, password } = req.body
    if (password.length < 6) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    }

    const login = await authService.login(email, password)
    const response = ServiceResponse.success('Successfully logged in', login)
    handleResponse(response, res)
  }),
  me: asyncWrapper(async (req, res) => {
    const user = res.locals.user!
    const response = ServiceResponse.success('Successfully get me', user)
    handleResponse(response, res)
  }),
}

export default authController

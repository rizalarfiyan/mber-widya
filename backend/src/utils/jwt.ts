/* eslint-disable import-x/default */
/* eslint-disable import-x/no-named-as-default-member */

import jwt, { type JwtPayload } from 'jsonwebtoken'
import env from '@/utils/env-config'
import type { StringValue } from 'ms'

const generateToken = (userId: number): string => {
  return jwt.sign({}, String(env.JWT_SECRET), {
    expiresIn: (env.JWT_EXPIRES_IN != null ? String(env.JWT_EXPIRES_IN) : '1800s') as StringValue,
    subject: String(userId),
  })
}

const verifyToken = (token: string): string | null | JwtPayload => {
  try {
    return jwt.verify(token, String(env.JWT_SECRET))
  } catch {
    return null
  }
}

export { generateToken, verifyToken }

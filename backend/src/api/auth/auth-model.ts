import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}

export type Auth = z.infer<typeof AuthSchema>
export const AuthSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string(),
  role: z.enum(UserRole),
})

export type User = z.infer<typeof UserSchema>
export const UserSchema = z.union([
  AuthSchema,
  z.object({
    password: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
])

export const RequestLoginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
})

export type Login = z.infer<typeof LoginSchema>
export const LoginSchema = z.object({
  user: AuthSchema,
  token: z.string(),
})

import { UserRole } from '@/models/base'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

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
    created_at: z.date(),
    updated_at: z.date(),
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

import { z } from 'zod'

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}

export enum DefaultOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const baseValidation = {
  id: z
    .string()
    .refine(data => !Number.isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine(num => num > 0, 'ID must be a positive number'),
}

export type ParamId = z.infer<typeof ParamIdSchema>
export const ParamIdSchema = z.object({
  params: z.object({
    id: baseValidation.id,
  }),
})

export type Pagination<T extends Record<string, unknown>> = {
  content: T[]
  meta: {
    page: number
    limit: number
    total: number
    total_page: number
  }
}

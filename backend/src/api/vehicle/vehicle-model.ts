import { baseValidation } from '@/models/base'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export enum VehicleStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type Vehicle = z.infer<typeof VehicleSchema>
export const VehicleSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(VehicleStatus),
  speed: z.number(),
  updated_at: z.date(),
})

export type VehicleDetail = z.infer<typeof VehicleDetailSchema>
export const VehicleDetailSchema = z.union([
  VehicleSchema,
  z.object({
    fuel_level: z.number(),
    odometer: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    updated_at: z.date(),
  }),
])

const RequestVehicleSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(32, { message: 'Name must be at most 32 characters long' }),
  status: z.enum(VehicleStatus, { message: 'Invalid vehicle status' }),
  speed: z
    .number()
    .min(0, { message: 'Speed must be a positive number' })
    .max(500, { message: 'Speed must be at most 500' }),
  fuel_level: z
    .number()
    .min(0, { message: 'Fuel level must be a positive number' })
    .max(100, { message: 'Fuel level must be at most 100' }),
  odometer: z
    .number()
    .min(0, { message: 'Odometer must be a positive number' })
    .max(1000000, { message: 'Odometer must be at most 1,000,000' }),
  latitude: z
    .number()
    .min(-90, { message: 'Latitude must be between -90 and 90' })
    .max(90, { message: 'Latitude must be between -90 and 90' }),
  longitude: z
    .number()
    .min(-180, { message: 'Longitude must be between -180 and 180' })
    .max(180, { message: 'Longitude must be between -180 and 180' }),
})

export type CreateVehicle = z.infer<typeof CreateVehicleSchema>
export const CreateVehicleSchema = z.object({
  body: RequestVehicleSchema,
})

export type UpdateVehicle = z.infer<typeof UpdateVehicleSchema>
export const UpdateVehicleSchema = z.object({
  params: z.object({
    id: baseValidation.id,
  }),
  body: RequestVehicleSchema,
})

export type DeleteVehicle = z.infer<typeof DeleteVehicleSchema>
export const DeleteVehicleSchema = z.object({
  params: z.object({
    id: baseValidation.id,
  }),
})

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export type Home = z.infer<typeof HomeSchema>
export const HomeSchema = z.object({
  name: z.string(),
  email: z.email(),
  github: z.string(),
  linkedin: z.string(),
  website: z.string(),
})

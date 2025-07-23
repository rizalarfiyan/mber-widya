import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
import ms, { StringValue } from 'ms'
import { z } from 'zod'

dotenvExpand.expand(dotenv.config())

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  HOST: z.string().min(1).default('localhost'),
  PORT: z.coerce.number().int().positive().default(8080),
  CORS_ORIGIN: z.url().default('http://localhost:8080'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN: z.string().refine(
    val => {
      const value = ms(val as StringValue)
      return !(value === undefined || value < 0)
    },
    {
      message: "Invalid time string format. e.g., '1h', '2d', '30m'",
    },
  ),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error)
  throw new Error('Invalid environment variables')
}

const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
}

export default env

import baseRouter from '@/api/base/base-route'
import docsRouter from '@/api/docs/docs-route'
import authRouter from '@/api/auth/auth-route'
import vehicleRouter from '@/api/vehicle/vehicle-route'
import errorHandler from '@/middleware/error-handler'
import requestLogger from '@/middleware/request-logger'
import env from '@/utils/env-config'
import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import helmet from 'helmet'
import { pino } from 'pino'

const logger = pino({ name: 'server' })
const app: Express = express()

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

// Middlewares
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(helmet())
app.use(requestLogger)

// Routers
app.use(baseRouter)
app.use(docsRouter)
app.use('/auth', authRouter)
app.use('/vehicle', vehicleRouter)

// Error Handler
app.use(errorHandler)

export { app, logger }

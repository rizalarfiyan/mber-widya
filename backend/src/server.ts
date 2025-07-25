import baseRouter from '@/api/base/base-route'
import docsRouter from '@/api/docs/docs-route'
import authRouter from '@/api/auth/auth-route'
import vehicleRouter from '@/api/vehicle/vehicle-route'
import errorHandler from '@/middleware/error-handler'
import requestLogger from '@/middleware/request-logger'
import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import helmet from 'helmet'
import { pino } from 'pino'

const logger = pino({ name: 'server' })
const app: Express = express()

// Middlewares
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
      'X-Auth-Token',
    ],
    optionsSuccessStatus: 204,
  }),
)
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

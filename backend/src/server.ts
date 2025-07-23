import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import helmet from 'helmet'
import { pino } from 'pino'
import env from '@/utils/env-config'
import errorHandler from '@/middleware/error-handler'
import requestLogger from '@/middleware/request-logger'

const logger = pino({ name: 'server' })
const app: Express = express()

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

// Middlewares
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(helmet())
app.use(requestLogger())

// Base API
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the API!')
})

app.use((_req, res) => {
  res.status(404).send('Not found')
})

app.use(errorHandler)

export { app, logger }

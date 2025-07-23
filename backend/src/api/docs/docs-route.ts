import { Router, type Request, type Response } from 'express'
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express'
import documentGenerator from '@/api/docs/document-generator'

const docsRouter: Router = Router()
const docsDocument = documentGenerator()

docsRouter.get('/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(docsDocument)
})

docsRouter.use('/swagger', swaggerServe, swaggerSetup(docsDocument))

export default docsRouter

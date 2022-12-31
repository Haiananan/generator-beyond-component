import Demo1Router from './Demo1Router'
import Test2Router from './Test2Router'
import Test1Router from './Test1Router'
import Test1Router from './Test1Router'
import HaloComponentRouter from './HaloComponentRouter'
import * as express from 'express'
import * as http from 'http'
import * as path from 'path'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import AuthRouter from './AuthRouter'
import MetaRouter from './MetaRouter'

const swaggerDef = require('../../swaggerDef')

export function init(app: express.Application): void {
  const router: express.Router = express.Router()

  app.use('Demo1', Demo1Router)

  app.use('Test2', Test2Router)

  app.use('Test1', Test1Router)

  app.use('Test1', Test1Router)

  app.use('HaloComponent', HaloComponentRouter)

  app.use('/auth', AuthRouter)

  app.use('/Meta', MetaRouter)

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, '../../src/**/**/*.ts')]
      })
    )
  )

  app.use((req, res) => {
    res.status(404).send(http.STATUS_CODES[404])
  })

  app.use(router)
}

import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { makeCreateServiceController } from '../factory/controllers/create-service-controller'
import { makeUpdateServiceController } from '../factory/controllers/update-service-controller'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'

const router = Router()

router.post(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(makeCreateServiceController())
)

router.put(
  '/:id',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(makeUpdateServiceController())
)

export { router as ServiceRoutes }

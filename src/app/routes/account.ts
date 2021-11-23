import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { makeCreateAccountController } from '../factory/controllers/create-account-controller'
import { makeDeleteAccountController } from '../factory/controllers/delete-account-controller'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'

const router = Router()

router.post('/', routerAdapter(makeCreateAccountController()))
router.delete(
  '/:id',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(makeDeleteAccountController())
)

export { router as AccountRoutes }

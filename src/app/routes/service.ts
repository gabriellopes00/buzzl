import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addServiceController } from '../builds/controllers/service/add-service'
import { deleteServiceController } from '../builds/controllers/service/delete-service'
import { listServiceByUserController } from '../builds/controllers/service/list-service-by-user'
import { regenerateKeyController } from '../builds/controllers/service/regenerate-service-api-key'
import { transferServiceController } from '../builds/controllers/service/transfer-service'
import { updateServiceController } from '../builds/controllers/service/update-service'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'

const router = Router()

router.post(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(addServiceController)
)
router.put(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(updateServiceController)
)
router.delete(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(deleteServiceController)
)
router.get(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(listServiceByUserController)
)
router.post(
  '/api-key/new',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(regenerateKeyController)
)
router.post(
  '/transfer',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(transferServiceController)
)

export default router

import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addServiceController } from '../builds/controllers/service/add-service'
import { deleteServiceController } from '../builds/controllers/service/delete-service'
import { listServiceByUserController } from '../builds/controllers/service/list-service-by-user'
import { regenerateKeyController } from '../builds/controllers/service/regenerate-service-api-key'
import { transferServiceController } from '../builds/controllers/service/transfer-service'
import { updateServiceController } from '../builds/controllers/service/update-service'
import { authMiddleware } from '../builds/middlewares/auth-user'

const router = Router()

router.post('/', middlewareAdapter(authMiddleware), routerAdapter(addServiceController))
router.put('/', middlewareAdapter(authMiddleware), routerAdapter(updateServiceController))
router.delete('/', middlewareAdapter(authMiddleware), routerAdapter(deleteServiceController))
router.get('/', middlewareAdapter(authMiddleware), routerAdapter(listServiceByUserController))
router.patch(
  '/api-key/new',
  middlewareAdapter(authMiddleware),
  routerAdapter(regenerateKeyController)
)
router.patch(
  '/transfer',
  middlewareAdapter(authMiddleware),
  routerAdapter(transferServiceController)
)

export default router

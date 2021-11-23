import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addFeedbackController } from '../builds/controllers/feedback/add-feedback'
import { deleteFeedbackController } from '../builds/controllers/feedback/delete-feedback'
import { listFeedbackController } from '../builds/controllers/feedback/list-feedback-by-service'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'
import { serviceRateLimiter } from '../setup/middlewares'

const router = Router()

router.get(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(listFeedbackController)
)
router.delete(
  '/',
  middlewareAdapter(makeAuthAccountMiddleware()),
  routerAdapter(deleteFeedbackController)
)
router.post('/', serviceRateLimiter, routerAdapter(addFeedbackController))

export default router

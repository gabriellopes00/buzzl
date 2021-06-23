import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addFeedbackController } from '../builds/controllers/feedback/add-feedback'
import { deleteFeedbackController } from '../builds/controllers/feedback/delete-feedback'
import { listFeedbackController } from '../builds/controllers/feedback/list-feedback-by-service'
import { authMiddleware } from '../builds/middlewares/auth-user'
import { serviceRateLimiter } from '../setup/middlewares'

const router = Router()

router.get('/', middlewareAdapter(authMiddleware), routerAdapter(listFeedbackController))
router.delete('/', middlewareAdapter(authMiddleware), routerAdapter(deleteFeedbackController))
router.post('/', serviceRateLimiter, routerAdapter(addFeedbackController))

export default router

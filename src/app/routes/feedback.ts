import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addFeedbackController } from '../builds/controllers/feedback/add-feedback'
import { listFeedbackController } from '../builds/controllers/feedback/list-feedback-by-user'
import { authMiddleware } from '../builds/middlewares/auth-user'

const router = Router()

router.post(
  '/feedback',
  rateLimit({
    windowMs: 60 * 60 * 1000 * 24,
    max: 30,
    headers: true,
    skipFailedRequests: true,
    message: 'Feedbacks limit reached'
  }),
  routerAdapter(addFeedbackController)
)
router.get('/feedback', middlewareAdapter(authMiddleware), routerAdapter(listFeedbackController))

export default router

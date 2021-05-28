import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addFeedbackController } from '../builds/controllers/feedback/add-feedback'
import { deleteFeedbackController } from '../builds/controllers/feedback/delete-feedback'
import { listFeedbackController } from '../builds/controllers/feedback/list-feedback-by-user'
import { authMiddleware } from '../builds/middlewares/auth-user'

const router = Router()

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24,
  max: 30,
  headers: true,
  skipFailedRequests: true,
  message: 'Feedbacks limit reached'
})

router.get('/', middlewareAdapter(authMiddleware), routerAdapter(listFeedbackController))
router.delete('/', middlewareAdapter(authMiddleware), routerAdapter(deleteFeedbackController))
router.post('/', rateLimiter, routerAdapter(addFeedbackController))

export default router

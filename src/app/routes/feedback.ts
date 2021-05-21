import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { routerAdapter } from '../adapters/express-router'
import { addFeedbackController } from '../builds/controllers/feedback/add-feedback'

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

export default router

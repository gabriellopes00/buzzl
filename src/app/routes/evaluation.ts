import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { routerAdapter } from '../adapters/express-router'
import { addEvaluationController } from '../builds/controllers/evaluation/add-evaluation'

const router = Router()

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24,
  max: 30,
  headers: true,
  skipFailedRequests: true,
  message: 'Feedbacks limit reached'
})

router.post('/', rateLimiter, routerAdapter(addEvaluationController))

export default router

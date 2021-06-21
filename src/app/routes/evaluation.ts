import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addEvaluationController } from '../builds/controllers/evaluation/add-evaluation'
import { getNPSController } from '../builds/controllers/evaluation/get-nps'
import { authMiddleware } from '../builds/middlewares/auth-user'

const router = Router()

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24,
  max: 30,
  headers: true,
  skipFailedRequests: true,
  message: 'Feedbacks limit reached'
})

router.post('/', rateLimiter, routerAdapter(addEvaluationController))
router.get('/nps', middlewareAdapter(authMiddleware), routerAdapter(getNPSController))

export default router

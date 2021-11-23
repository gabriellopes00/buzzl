import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addEvaluationController } from '../builds/controllers/evaluation/add-evaluation'
import { getNPSController } from '../builds/controllers/evaluation/get-nps'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'
import { serviceRateLimiter } from '../setup/middlewares'

const router = Router()

router.post('/', serviceRateLimiter, routerAdapter(addEvaluationController))
router.get('/nps', middlewareAdapter(makeAuthAccountMiddleware()), routerAdapter(getNPSController))

export default router

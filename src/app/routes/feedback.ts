import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { makeCreateFeedbackController } from '../factory/controllers/create-feedback-controller'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'

const router = Router()

router.post(
  '/',
  middlewareAdapter([makeAuthAccountMiddleware()]),
  routerAdapter(makeCreateFeedbackController())
)

export {}

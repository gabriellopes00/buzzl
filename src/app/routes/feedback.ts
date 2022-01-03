import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { makeCreateFeedbackController } from '../factory/controllers/create-feedback-controller'

const router = Router()

router.post('/', routerAdapter(makeCreateFeedbackController()))

export { router as FeedbackRoutes }

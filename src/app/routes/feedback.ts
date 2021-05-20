import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { addFeedbackController } from '../builds/controllers/feedback/add-feedback'

const router = Router()

router.post('/feedback', routerAdapter(addFeedbackController))

export default router

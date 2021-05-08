import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { addServiceController } from '../builds/controllers/add-service'

const router = Router()

router.post('/service', routerAdapter(addServiceController))

export default router

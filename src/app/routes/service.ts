import { AuthUserMiddleware } from '@/presentation/middlewares/auth-user'
import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { addServiceController } from '../builds/controllers/add-service'
import { authentication } from '../builds/usecases/authentication'

const router = Router()
const authMiddleware = middlewareAdapter(new AuthUserMiddleware(authentication))

router.post('/service', authMiddleware, routerAdapter(addServiceController))

export default router

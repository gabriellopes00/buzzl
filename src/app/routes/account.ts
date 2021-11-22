import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { makeCreateAccountController } from '../factory/controllers/create-account-controller'

const router = Router()

router.post('/', routerAdapter(makeCreateAccountController()))
// router.post('/auth', routerAdapter(signInController))
// router.delete('/:id', middlewareAdapter(authMiddleware), routerAdapter(deleteUserController))

export { router as AccountRoutes }

import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { addUserController } from '../builds/controllers/add-user'
import { authUserController } from '../builds/controllers/sign-in'

const router = Router()

router.post('/signup', routerAdapter(addUserController))
router.post('/signin', routerAdapter(authUserController))

export default router

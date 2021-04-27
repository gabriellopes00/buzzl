import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { authUserController } from '../builds/controllers/auth-user'

export default (router: Router): void => {
  router.post('/login', routerAdapter(authUserController))
}

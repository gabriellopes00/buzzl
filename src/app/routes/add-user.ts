import { Router } from 'express'
import { routerAdapter } from '../adapters/express-router'
import { addUserController } from '../builds/controllers/add-user'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(addUserController))
}

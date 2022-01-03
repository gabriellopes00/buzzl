import { Router } from 'express'
import { middlewareAdapter } from '../adapters/express-middlewares'
import { routerAdapter } from '../adapters/express-router'
import { makeCreateAccountController } from '../factory/controllers/create-account-controller'
import { makeDeleteAccountController } from '../factory/controllers/delete-account-controller'
import { makeFindAccountServiceController } from '../factory/controllers/find-account-service-controller'
import { makeSignInController } from '../factory/controllers/sign-in-account-controller'
import { makeAuthAccountMiddleware } from '../factory/middlewares/auth-account-middleware'

const router = Router()

router.post('/', routerAdapter(makeCreateAccountController()))
router.post('/sign-in', routerAdapter(makeSignInController()))
router.get(
  '/:id/services',
  middlewareAdapter([makeAuthAccountMiddleware()]),
  routerAdapter(makeFindAccountServiceController())
)
// router.get(
//   '/sign-in/google',
//   passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline' })
// )
// router.get(
//   '/sign-in/google/callback',
//   passport.authenticate('google', {
//     assignProperty: 'googleAccount',
//     failureRedirect: '/accounts/failure'
//   }),
//   (_, res) => res.redirect('/accounts/success')
// )

// router.get('/success', (_, res) => res.send('success'))
// router.get('/failure', (_, res) => res.send('failure'))
router.delete(
  '/:id',
  middlewareAdapter([makeAuthAccountMiddleware()]),
  routerAdapter(makeDeleteAccountController())
)

export { router as AccountRoutes }

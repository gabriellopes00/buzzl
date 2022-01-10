import { Router } from 'express'
import { passport } from '@/infra/oauth/passport-google'
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
router.delete(
  '/:id',
  middlewareAdapter([makeAuthAccountMiddleware()]),
  routerAdapter(makeDeleteAccountController())
)

router.get(
  '/sign-in/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    passReqToCallback: true
  })
)
router.get(
  '/sign-in/google/callback',
  passport.authenticate('google', { assignProperty: 'googleAccount' }),
  (req, res) => {
    res.status(200).json({ google_account: req.googleAccount })
  }
)

export { router as AccountRoutes }

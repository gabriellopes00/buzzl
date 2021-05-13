import { AuthUserMiddleware } from '@/presentation/middlewares/auth-user'
import { makeDecorator } from '../controllers/factory'
import { authentication } from '../usecases/authentication'

export const authMiddleware = makeDecorator(new AuthUserMiddleware(authentication))

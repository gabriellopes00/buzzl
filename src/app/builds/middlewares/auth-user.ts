import { AuthUserMiddleware } from '@/presentation/middlewares/auth-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { JWTFormatValidator } from '@/presentation/validation/jwt-format'
import { authentication } from '../usecases/authentication'

const validator = new ValidatorCompositor([new JWTFormatValidator()])

export const authMiddleware = new AuthUserMiddleware(validator, authentication)

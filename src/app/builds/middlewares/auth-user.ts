import { AuthUserMiddleware } from '@/presentation/middlewares/auth-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { JWTFormatValidator } from '@/presentation/validation/jwt-format'
import { authentication } from '../usecases/authentication'

const jwtFormatValidator = new JWTFormatValidator()
const validator = new ValidatorCompositor([jwtFormatValidator])

export const authMiddleware = new AuthUserMiddleware(validator, authentication)

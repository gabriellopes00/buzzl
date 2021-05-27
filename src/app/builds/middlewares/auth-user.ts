import { AuthUserMiddleware } from '@/presentation/middlewares/auth-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { JWTFormatValidator } from '@/presentation/validation/jwt-format'
import { makeDecorator } from '../controllers/factory'
import { authentication } from '../usecases/authentication'

const jwtFormatValidator = new JWTFormatValidator()
const validator = new ValidatorCompositor([jwtFormatValidator])

export const authMiddleware = makeDecorator(new AuthUserMiddleware(validator, authentication))

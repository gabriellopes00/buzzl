import { AuthUserController } from '@/presentation/controllers/auth-user'
import { AuthValidator } from '@/presentation/validation/auth'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { authenticator } from '../usecases/authenticator'

const requiredFieldsValidation = new RequiredFieldValidation(['email', 'password'])
const authValidator = new AuthValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, authValidator])

export const authUserController = new AuthUserController(validator, authenticator)

import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { UserValidator } from '@/presentation/validation/user'

const requiredFieldsValidation = new RequiredFieldValidation(['name', 'email', 'password'])
const userValidator = new UserValidator()

export const validator = new ValidatorCompositor([requiredFieldsValidation, userValidator])

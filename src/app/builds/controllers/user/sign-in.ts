import { SignInController } from '@/presentation/controllers/user/sign-in'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { PasswordValidator } from '@/presentation/validation/password-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { signIn } from '../../usecases/sign-in'

const validator = new ValidatorCompositor([
  new RequiredFieldValidation(['email', 'password']),
  new EmailValidator(),
  new PasswordValidator()
])

export const signInController = new SignInController(validator, signIn)

import { AddUserController } from '@/presentation/controllers/user/add-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { NameValidator } from '@/presentation/validation/name-validator'
import { PasswordValidator } from '@/presentation/validation/password-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddUser } from '@/usecases/implementation/user/add-user'
import { hashGenerator, idGenerator, userRepository } from '../infra'
import { authenticator } from '../usecases/authenticator'
import { makeController } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['name', 'email', 'password'])
const nameValidator = new NameValidator()
const passValidator = new PasswordValidator()
const emailValidator = new EmailValidator()
const validator = new ValidatorCompositor([
  requiredFieldsValidation,
  nameValidator,
  emailValidator,
  passValidator
])

const dbAddUser = new DbAddUser(userRepository, idGenerator, hashGenerator)

export const addUserController = makeController(
  new AddUserController(validator, dbAddUser, authenticator)
)

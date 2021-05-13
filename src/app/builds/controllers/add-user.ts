import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddUserController } from '@/presentation/controllers/user/add-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { NameValidator } from '@/presentation/validation/name-validator'
import { PasswordValidator } from '@/presentation/validation/password-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddUser } from '@/usecases/user/add-user'
import { signIn } from '../usecases/sign-in'
import { makeDecorator } from './factory'

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

const dbAddUser = new DbAddUser(new PgUserRepository(), new IDGenerator(), new Argon2Hasher())
export const addUserController = makeDecorator(new AddUserController(validator, dbAddUser, signIn))

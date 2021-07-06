import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbDeleteUser } from '@/usecases/user/delete-user'

const validator = new ValidatorCompositor([
  new RequiredFieldValidation(['email']),
  new EmailValidator()
])

const dbDeleteUser = new DbDeleteUser(new PgUserRepository())

export const deleteUserController = new DeleteUserController(validator, dbDeleteUser)

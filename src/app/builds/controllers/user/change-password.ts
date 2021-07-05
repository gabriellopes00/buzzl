import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { ChangePassController } from '@/presentation/controllers/user/change-password'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbChangePassword } from '@/usecases/user/change-password'

const requiredFieldsValidation = new RequiredFieldValidation(['newPass', 'currentPass'])
const validator = new ValidatorCompositor([requiredFieldsValidation])

const dbChangePass = new DbChangePassword(new PgUserRepository(), new Argon2Hasher())

export const changePassController = new ChangePassController(validator, dbChangePass)

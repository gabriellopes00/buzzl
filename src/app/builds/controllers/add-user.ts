import { AddUserController } from '@/presentation/controllers/add-user'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { UserValidator } from '@/presentation/validation/user'
import { DbAddUser } from '@/usecases/implementation/add-user'
import { hashGenerator, idGenerator, userRepository } from '../infra'
import { authenticator } from '../usecases/authenticator'

const requiredFieldsValidation = new RequiredFieldValidation(['name', 'email', 'password'])
const userValidator = new UserValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, userValidator])

const dbAddUser = new DbAddUser(userRepository, idGenerator, hashGenerator)

export const addUserController = new AddUserController(validator, dbAddUser, authenticator)

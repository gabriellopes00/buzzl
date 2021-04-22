import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { UserValidator } from '@/presentation/validation/user'

import { DbAddUser } from '@/usecases/implementation/add-user'
import { idGenerator, userRepository } from '../infra'

import { AddUserController } from '@/presentation/controllers/add-user'

const requiredFieldsValidation = new RequiredFieldValidation(['name', 'email', 'password'])
const userValidator = new UserValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, userValidator])

const dbAddUser = new DbAddUser(idGenerator, userRepository)

export const addUserController = new AddUserController(validator, dbAddUser)

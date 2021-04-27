import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { UserValidator } from '@/presentation/validation/user'

import { DbAddUser } from '@/usecases/implementation/add-user'
import { hashGenerator, idGenerator, userRepository } from '../infra'

import { AddUserController } from '@/presentation/controllers/add-user'
import { UserAuthenticator } from '@/usecases/implementation/auth-user'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { TOKEN_EXPIRATION, TOKEN_PRIVATE_KEY } from '@/config/env'

const requiredFieldsValidation = new RequiredFieldValidation(['name', 'email', 'password'])
const userValidator = new UserValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, userValidator])

const dbAddUser = new DbAddUser(userRepository, idGenerator, hashGenerator)

const hasher = new Argon2Hasher()
const jwtEncrypter = new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_EXPIRATION)
export const authenticator = new UserAuthenticator(userRepository, hasher, jwtEncrypter)

export const addUserController = new AddUserController(validator, dbAddUser, authenticator)

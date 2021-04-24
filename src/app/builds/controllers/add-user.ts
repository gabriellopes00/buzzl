import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { UserValidator } from '@/presentation/validation/user'

import { DbAddUser } from '@/usecases/implementation/add-user'
import { hashGenerator, idGenerator, userRepository } from '../infra'

import { AddUserController } from '@/presentation/controllers/add-user'
import { UserAuthenticator } from '@/usecases/implementation/auth-user'
import { BcryptHasher } from '@/infra/utils/bcrypt-hasher'
import { TokenRepository } from '@/infra/database/repositories/access-token'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { TOKEN_DURATION, TOKEN_PRIVATE_KEY } from '@/config/env'

const requiredFieldsValidation = new RequiredFieldValidation(['name', 'email', 'password'])
const userValidator = new UserValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, userValidator])

const dbAddUser = new DbAddUser(userRepository, idGenerator, hashGenerator)

const hasher = new BcryptHasher()
const jwtEncrypter = new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_DURATION)
const repo = new TokenRepository()
export const authenticator = new UserAuthenticator(userRepository, hasher, jwtEncrypter, repo)

export const addUserController = new AddUserController(validator, dbAddUser, authenticator)

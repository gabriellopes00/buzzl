import { Controller } from '@/core/presentation/controllers'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UUIDV4Generator } from '@/infra/utils/uuid-generator'
import { JoiValidator } from '@/infra/validation/joi-validator'
import {
  CreateAccountController,
  CreateAccountControllerParams
} from '@/modules/accounts/controllers/create-account-controller'
import { CreateAccount } from '@/modules/accounts/usecases/create-account'
import Joi from 'joi'

const { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY, ACCESS_TOKEN_EXPIRATION } = process.env

export function makeCreateAccountController(): Controller {
  const accountRepository = new PgAccountRepository()
  const uuidGenerator = new UUIDV4Generator()
  const argon2Hasher = new Argon2Hasher()
  const createAccount = new CreateAccount(accountRepository, uuidGenerator, argon2Hasher)

  const validator = new JoiValidator(
    Joi.object<CreateAccountControllerParams>({
      name: Joi.string().min(4).max(255).required().trim(),
      email: Joi.string().required().email().trim(),
      password: Joi.string().min(4).max(255).required().trim()
    })
  )
  const jwtEncrypter = new JWTEncrypter(
    ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY,
    ACCESS_TOKEN_EXPIRATION
  )
  const controller = new CreateAccountController(validator, createAccount, jwtEncrypter)
  return controller
}

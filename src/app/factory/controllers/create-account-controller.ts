import { Controller } from '@/core/presentation/controllers'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UUIDV4Generator } from '@/infra/utils/uuid-generator'
import { CreateAccountController } from '@/modules/accounts/controllers/create-account-controller'
import { DbCreateAccount } from '@/modules/accounts/usecases/create-account'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'

const { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY, ACCESS_TOKEN_EXPIRATION } = process.env

export function makeCreateAccountController(): Controller {
  const accountRepository = new PgAccountRepository()
  const uuidGenerator = new UUIDV4Generator()
  const argon2Hasher = new Argon2Hasher()
  const createAccount = new DbCreateAccount(accountRepository, uuidGenerator, argon2Hasher)

  const validator = new ValidatorCompositor([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password')
  ])
  const jwtEncrypter = new JWTEncrypter(
    ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY,
    ACCESS_TOKEN_EXPIRATION
  )
  const controller = new CreateAccountController(validator, createAccount, jwtEncrypter)
  return controller
}

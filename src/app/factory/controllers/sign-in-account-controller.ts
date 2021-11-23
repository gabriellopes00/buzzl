import { Controller } from '@/core/presentation/controllers'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { SignInAccountController } from '@/modules/accounts/controllers/sign-in-account-controller'
import { DbSignInAccount } from '@/modules/accounts/usecases/sign-in-account'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'

const { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY, ACCESS_TOKEN_EXPIRATION } = process.env

export function makeSignInController(): Controller {
  const accountRepository = new PgAccountRepository()
  const jwtEncrypter = new JWTEncrypter(
    ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY,
    ACCESS_TOKEN_EXPIRATION
  )
  const argon2Hasher = new Argon2Hasher()
  const signInAccount = new DbSignInAccount(accountRepository, argon2Hasher, jwtEncrypter)

  const validator = new ValidatorCompositor([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password')
  ])

  const controller = new SignInAccountController(validator, signInAccount)
  return controller
}

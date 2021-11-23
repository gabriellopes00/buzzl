import { Middleware } from '@/core/presentation/middleware'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { DbAuthAccount } from '@/modules/accounts/usecases/auth-account'
import { AuthAccountMiddleware } from '@/presentation/middlewares/auth-account-middleware'

const { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY, ACCESS_TOKEN_EXPIRATION } = process.env

export function makeAuthAccountMiddleware(): Middleware {
  const repository = new PgAccountRepository()
  const jwtEncrypter = new JWTEncrypter(
    ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY,
    ACCESS_TOKEN_EXPIRATION
  )
  const authAccount = new DbAuthAccount(jwtEncrypter, repository)
  return new AuthAccountMiddleware(authAccount)
}

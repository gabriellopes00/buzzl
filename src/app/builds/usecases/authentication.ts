import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UserAuthentication } from '@/usecases/user/authentication'

const { TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_EXPIRATION } = process.env

export const authentication = new UserAuthentication(
  new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_EXPIRATION),
  new PgUserRepository()
)

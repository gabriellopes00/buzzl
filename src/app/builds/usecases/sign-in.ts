import { PgUserRepository } from '@/infra/database/repositories/account-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UserSignIn } from '@/usecases/user/sign-in'

const { TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_EXPIRATION } = process.env

export const signIn = new UserSignIn(
  new PgUserRepository(),
  new Argon2Hasher(),
  new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_EXPIRATION)
)

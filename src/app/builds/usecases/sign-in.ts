import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UserSignIn } from '@/usecases/user/sign-in'
import { getCustomRepository } from 'typeorm'

const { TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_EXPIRATION } = process.env

export const signIn = new UserSignIn(
  getCustomRepository(PgUserRepository),
  new Argon2Hasher(),
  new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_EXPIRATION)
)

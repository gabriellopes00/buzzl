import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UserAuthenticator } from '@/usecases/implementation/user/auth-user'
import { getCustomRepository } from 'typeorm'

const { TOKEN_PRIVATE_KEY, TOKEN_EXPIRATION } = process.env

export const authenticator = new UserAuthenticator(
  getCustomRepository(PgUserRepository),
  new Argon2Hasher(),
  new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_EXPIRATION)
)

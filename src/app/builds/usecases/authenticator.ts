import { TOKEN_PRIVATE_KEY, TOKEN_EXPIRATION } from '@/config/env'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import { UserAuthenticator } from '@/usecases/implementation/auth-user'
import { userRepository } from '../infra'

const hasher = new Argon2Hasher()
const jwtEncrypter = new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_EXPIRATION)
export const authenticator = new UserAuthenticator(userRepository, hasher, jwtEncrypter)

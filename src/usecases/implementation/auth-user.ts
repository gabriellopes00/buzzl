import { UnmatchedPasswordError } from '@/domain/usecases/errors/user/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/errors/user/unregistered-email'
import { AuthParams, AuthUser } from '@/domain/usecases/user/auth-user'
import { AccessTokenRepository } from '../ports/access-token-repository'
import { Encrypter } from '../ports/encrypter'
import { Hasher } from '../ports/hasher'
import { UserRepository } from '../ports/user-repository'

export class UserAuthenticator implements AuthUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: Hasher,
    private readonly encrypter: Encrypter,
    private readonly accessTokenRepository: AccessTokenRepository
  ) {}

  async auth(data: AuthParams): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> {
    const { email, password } = data
    const existingUser = await this.userRepository.findByEmail(email)
    if (!existingUser) return new UnregisteredEmailError(email)

    const matchedPassword = await this.hashComparer.compare(password, existingUser.password)
    if (!matchedPassword) return new UnmatchedPasswordError(email)

    const token = await this.encrypter.encrypt(existingUser.id)

    await this.accessTokenRepository.add(token, email)

    return token
  }
}

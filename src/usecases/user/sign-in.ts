import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { SignIn, SignInParams } from '@/domain/user/sign-in'
import { Encrypter } from '../ports/encrypter'
import { Hasher } from '../ports/hasher'
import { UserRepository } from '../ports/user-repository'

export class UserSignIn implements SignIn {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: Hasher,
    private readonly encrypter: Encrypter
  ) {}

  async sign(
    data: SignInParams
  ): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> {
    const { email, password } = data
    const existingUser = await this.userRepository.findBy({ email })
    if (!existingUser) return new UnregisteredEmailError(email)

    const matchedPassword = await this.hashComparer.compare(password, existingUser.password)
    if (!matchedPassword) return new UnmatchedPasswordError(email)

    const token = await this.encrypter.encrypt({ id: existingUser.id })
    return token
  }
}

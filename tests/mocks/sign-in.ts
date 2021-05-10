import { UnmatchedPasswordError } from '@/domain/usecases/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/user/errors/unregistered-email'
import { SignIn, SignInParams } from '@/domain/usecases/user/sign-in'
import { MockEncrypter } from './encrypter'

export class MockSignIn implements SignIn {
  async sign(
    data: SignInParams
  ): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> {
    return new MockEncrypter().encrypt('')
  }
}

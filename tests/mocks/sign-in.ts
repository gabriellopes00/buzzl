import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { SignIn, SignInParams } from '@/domain/user/sign-in'
import { MockEncrypter } from './encrypter'

export class MockSignIn implements SignIn {
  async sign(
    data: SignInParams
  ): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> {
    return new MockEncrypter().encrypt('')
  }
}

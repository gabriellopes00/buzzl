import { UnmatchedPasswordError } from '@/domain/usecases/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/user/errors/unregistered-email'
import { AuthParams, AuthUser } from '@/domain/usecases/user/auth-user'
import { MockEncrypter } from './encrypter'

export class MockAuthenticator implements AuthUser {
  async auth(data: AuthParams): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> {
    return new MockEncrypter().encrypt('')
  }
}

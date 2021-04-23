import { AuthParams, AuthUser } from '@/domain/usecases/user/auth-user'
import { MockEncrypter } from './encrypter'

export class MockAuthenticator implements AuthUser {
  async auth(data: AuthParams): Promise<string> {
    return new MockEncrypter().encrypt('')
  }
}

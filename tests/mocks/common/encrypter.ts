import { Encrypter } from '@/usecases/ports/encrypter'
import { fakeUser } from '../user/user'

export class MockEncrypter implements Encrypter {
  async encrypt(payload: string): Promise<string> {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  }

  async decrypt(token: string): Promise<Object> {
    return { id: fakeUser.id }
  }
}

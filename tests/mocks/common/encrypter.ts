import { Encrypter } from '@/usecases/ports/encrypter'

export class MockedEncrypter implements Encrypter {
  async encrypt(payload: Object): Promise<string> {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  }

  async decrypt<T = Object>(token: string): Promise<T> {
    return {
      id: '55bc05b5-118c-4fa9-8b92-163348ea85ce',
      name: 'John Doe',
      email: 'johndoe@mail.com'
    } as unknown as T
  }
}

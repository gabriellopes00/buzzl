import { Encrypter } from '@/core/infra/encrypter'
import { sign, verify } from 'jsonwebtoken'

export class JWTEncrypter implements Encrypter {
  constructor(
    private readonly privateKey: string,
    private readonly publicKey: string,
    private readonly tokenExpiration: string
  ) {}

  async encrypt(payload: Object): Promise<string> {
    return sign({ ...payload }, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: this.tokenExpiration
    })
  }

  async decrypt<T = Object>(token: string): Promise<T> {
    try {
      return verify(token, this.publicKey, { algorithms: ['RS256'] }) as T
    } catch (error) {
      return null
    }
  }
}

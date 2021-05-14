import { Encrypter } from '@/usecases/ports/encrypter'
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

  async decrypt(token: string): Promise<Object> {
    try {
      return verify(token, this.publicKey, { algorithms: ['RS256'] })
    } catch (error) {
      if (error.message === 'invalid token') return null
      else if (error.message === 'jwt expired') return null
      else throw error
    }
  }
}

import { Encrypter } from '@/usecases/ports/encrypter'
import { JsonWebTokenError, sign, TokenExpiredError, verify } from 'jsonwebtoken'

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
      if (error instanceof JsonWebTokenError) return null
      else if (error instanceof TokenExpiredError) return null
      else throw error
    }
  }
}

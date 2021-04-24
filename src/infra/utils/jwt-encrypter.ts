import { Encrypter } from '@/usecases/ports/encrypter'
import { sign } from 'jsonwebtoken'

export class JWTEncrypter implements Encrypter {
  constructor(private readonly privateKey: string, private readonly tokenExpiration: string) {}

  async encrypt(payload: Object): Promise<string> {
    const token = sign({ ...payload }, this.privateKey, { algorithm: 'RS256', expiresIn: 60 * 15 })
    return token
  }
}

import { Hasher } from '@/core/infra/hasher'
import { hash, verify } from 'argon2'
import { randomBytes } from 'crypto'

export class Argon2Hasher implements Hasher {
  private readonly salt = randomBytes(12)

  async generate(payload: string): Promise<string> {
    return await hash(payload, { salt: this.salt })
  }

  async compare(payload: string, payloadHash: string): Promise<boolean> {
    return await verify(payloadHash, payload, { salt: this.salt })
  }
}

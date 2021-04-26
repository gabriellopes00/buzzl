import { Hasher } from '@/usecases/ports/hasher'

import { randomBytes } from 'crypto'
import { hash, verify } from 'argon2'

export class Argon2Hasher implements Hasher {
  private readonly salt = randomBytes(12)

  async generate(payload: string): Promise<string> {
    const hashPayload = await hash(payload, { salt: this.salt })
    return hashPayload
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    const isValidHash = await verify(hash, payload, { salt: this.salt })
    return isValidHash
  }
}

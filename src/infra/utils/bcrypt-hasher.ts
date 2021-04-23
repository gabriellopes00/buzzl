import { Hasher } from '@/usecases/ports/hasher'

import { hash, compare } from 'bcrypt'

export class BcryptHasher implements Hasher {
  private readonly salt = 12

  async generate(payload: string): Promise<string> {
    const hashPayload = await hash(payload, this.salt)
    return hashPayload
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    const isValidHash = await compare(payload, hash)
    return isValidHash
  }
}

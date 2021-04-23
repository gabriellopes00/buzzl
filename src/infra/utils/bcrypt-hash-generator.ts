import { HashGenerator } from '@/usecases/ports/hash-generator'

import { hash } from 'bcrypt'

export class BcryptHashGenerator implements HashGenerator {
  private readonly salt = 12

  async hash(payload: string): Promise<string> {
    const hashPayload = await hash(payload, this.salt)
    return hashPayload
  }
}

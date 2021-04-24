import { AccessTokenRepository } from '@/usecases/ports/access-token-repository'
import fs from 'fs'

export class TokenRepository implements AccessTokenRepository {
  async add(token: string, userEmail: string): Promise<void> {
    fs.appendFileSync('./db.txt', `${token}-${userEmail},`)
  }
}

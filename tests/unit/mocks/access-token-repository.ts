import { AccessTokenRepository } from '@/usecases/ports/access-token-repository'

export class MockAccessTokenRepository implements AccessTokenRepository {
  async add(token: string, userEmail: string): Promise<void> {}
}

import { Hasher } from '@/usecases/ports/hasher'

export class MockHasher implements Hasher {
  async generate(password: string): Promise<string> {
    return 'E1F88AD57CD9C593E883C7665204D2D26BFE83317D8C97B737303AB855C970C9'
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return true
  }
}

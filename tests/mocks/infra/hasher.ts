import { Hasher } from '@/core/infra/hasher'

/**
 * Mocked Hasher implements Hasher interface using no external dependencies.
 * @generate Generate method returns a static MD5 hash asynchronously.
 * @compare Compare method compares a payload hash with a given hash, it always returns true.
 */
export class MockedHasher implements Hasher {
  async generate(password: string): Promise<string> {
    return '64A2823DE59DDD8B7A0949B518566E8D3761AF3829B503C2244C6EA62DEF4131'
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return true
  }
}

export default new MockedHasher()

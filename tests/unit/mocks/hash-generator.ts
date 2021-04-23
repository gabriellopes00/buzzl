import { HashGenerator } from '@/usecases/ports/hash-generator'

export class MockHashGenerator implements HashGenerator {
  async hash(password: string): Promise<string> {
    return 'E1F88AD57CD9C593E883C7665204D2D26BFE83317D8C97B737303AB855C970C9'
  }
}

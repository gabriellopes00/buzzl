import { APIKeyGenerator } from '@/usecases/ports/api-key-generator'

export class MockAPIKeyGenerator implements APIKeyGenerator {
  generate(): string {
    return '_cbvTX7PjT15'
  }
}

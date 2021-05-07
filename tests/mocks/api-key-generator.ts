import { ApiKeyGenerator } from '@/usecases/ports/api-key-generator'

export class MockApiKeyGenerator implements ApiKeyGenerator {
  generate(): string {
    return '_cbvTX7PjT15'
  }
}

import { ApiKeyGenerator } from '@/domain/usecases/service/api-key-generator'

export class MockApiKeyGenerator implements ApiKeyGenerator {
  generate(): string {
    return '_cbvTX7PjT15'
  }
}

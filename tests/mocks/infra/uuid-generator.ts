import { UUIDGenerator } from '@/core/infra/uuid-generator'

/**
 * Mocked UUID Generator implements UUIDGenerator interface using no external dependencies.
 * @generate Returns a static uuid.
 */
export class MockedUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return '55bc05b5-118c-4fa9-8b92-163348ea85ce'
  }
}

export default new MockedUUIDGenerator()

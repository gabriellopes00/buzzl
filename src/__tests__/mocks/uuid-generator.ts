import { UUIDGenerator } from '@/usecases/ports/uuid-generator'

export class MockUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return '55bc05b5-118c-4fa9-8b92-163348ea85ce'
  }
}

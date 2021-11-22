import { UUIDGenerator } from '@/core/infra/uuid-generator'
import { v4 as UUIDv4 } from 'uuid'

export class UUIDV4Generator implements UUIDGenerator {
  generate(): string {
    return UUIDv4()
  }
}

import { Service } from '@/domain/entities/service'
import { AddService, ServiceParams } from '@/domain/usecases/service/add-service'
import { ApiKeyGenerator } from '@/domain/usecases/service/api-key-generator'
import { UUIDGenerator } from '../ports/uuid-generator'

export class DbAddService implements AddService {
  constructor(
    private readonly uuidGenerator: UUIDGenerator,
    private readonly apiKeyGenerator: ApiKeyGenerator
  ) {}

  public async add(data: ServiceParams): Promise<Service> {
    this.uuidGenerator.generate()
    this.apiKeyGenerator.generate()
    return null
  }
}

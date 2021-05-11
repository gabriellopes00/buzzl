import { Service } from '@/domain/service/service'
import { AddService, ServiceParams } from '@/domain/service/add-service'
import { ApiKeyGenerator } from '@/usecases/ports/api-key-generator'
import { ServiceRepository } from '../../ports/service-repository'
import { UUIDGenerator } from '../../ports/uuid-generator'

export class DbAddService implements AddService {
  constructor(
    private readonly uuidGenerator: UUIDGenerator,
    private readonly apiKeyGenerator: ApiKeyGenerator,
    private readonly serviceRepository: ServiceRepository
  ) {}

  public async add(data: ServiceParams): Promise<Service> {
    const id = this.uuidGenerator.generate()
    const apiKey = this.apiKeyGenerator.generate()
    const newService = await this.serviceRepository.add({ ...data, id, apiKey, isActive: true })
    return newService
  }
}

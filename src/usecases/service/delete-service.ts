import { DeleteService } from '@/domain/service/delete-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { ServiceRepository } from '../ports/service-repository'

export class DbDeleteService implements DeleteService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  public async delete(apiKey: string): Promise<void | UnregisteredApiKeyError> {
    const existingService = await this.serviceRepository.exists({ apiKey })
    if (!existingService) return new UnregisteredApiKeyError(apiKey)

    await this.serviceRepository.delete({ apiKey })
  }
}

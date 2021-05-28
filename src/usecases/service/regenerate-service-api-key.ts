import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { RegenerateServiceApiKey } from '@/domain/service/regenerate-service-api-key'
import { Service } from '@/domain/service/service'
import { APIKeyGenerator } from '../ports/api-key-generator'
import { ServiceRepository } from '../ports/service-repository'

export class DbRegenerateServiceApiKey implements RegenerateServiceApiKey {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly apiKeyGenerator: APIKeyGenerator
  ) {}

  public async regenerate(
    currentKey: string,
    maintainerId: string
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    const service = await this.serviceRepository.findOneJoinMaintainer({ apiKey: currentKey })
    if (!service) return new UnregisteredApiKeyError(currentKey)
    else if (service.maintainer.id !== maintainerId) {
      return new UnauthorizedMaintainerError(maintainerId)
    }

    const newKey = this.apiKeyGenerator.generate()
    const normalized: Service = { ...service, maintainer: service.maintainer.id, apiKey: newKey }
    const updatedService = this.serviceRepository.update(normalized)
    return updatedService
  }
}

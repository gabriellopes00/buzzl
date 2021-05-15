import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { Service } from '@/domain/service/service'
import { UpdateService } from '@/domain/service/update-service'
import { ServiceRepository } from '../ports/service-repository'

export class DbUpdateService implements UpdateService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  public async update(
    apiKey: string,
    userId: string,
    newData: Partial<Omit<Service, 'id' | 'apiKey' | 'maintainer'>>
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    const service = await this.serviceRepository.findOneJoinMaintainer({ apiKey })

    if (!service) return new UnregisteredApiKeyError(apiKey)
    else if (service.maintainer.id !== userId) {
      return new UnauthorizedMaintainerError(apiKey, service.maintainer.email)
    }

    return await this.serviceRepository.update({ apiKey }, newData)
  }
}

import { DeleteService, DeleteServiceParams } from '@/domain/service/delete-service'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { ServiceRepository } from '../ports/service-repository'

export class DbDeleteService implements DeleteService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  public async delete({
    apiKey,
    userId
  }: DeleteServiceParams): Promise<void | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    const existingService = await this.serviceRepository.findOneJoinMaintainer({ apiKey })

    if (!existingService) return new UnregisteredApiKeyError(apiKey)
    else if (existingService.maintainer.id !== userId) {
      return new UnauthorizedMaintainerError(apiKey)
    }

    await this.serviceRepository.delete({ apiKey })
  }
}

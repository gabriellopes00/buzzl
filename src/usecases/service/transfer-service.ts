import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { Service } from '@/domain/service/service'
import { TransferService } from '@/domain/service/transfer-service'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { ServiceRepository } from '../ports/service-repository'
import { UserRepository } from '../ports/user-repository'

export class DbTransferService implements TransferService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly serviceRepository: ServiceRepository
  ) {}

  public async transfer(
    apiKey: string,
    currentMaintainerId: string,
    newMaintainerEmail: string
  ): Promise<Service | UnregisteredEmailError | UnregisteredApiKeyError> {
    const newMaintainer = await this.userRepository.findOne({ email: newMaintainerEmail })
    if (!newMaintainer) return new UnregisteredEmailError(newMaintainerEmail)

    const service = await this.serviceRepository.findOneJoinMaintainer({ apiKey })
    if (!service) return new UnregisteredApiKeyError(apiKey)
    else if (service.maintainer.id !== currentMaintainerId) {
      return new UnauthorizedMaintainerError(apiKey)
    }

    const updatedService = { ...service, maintainer: newMaintainer.id }
    return await this.serviceRepository.update(updatedService)
  }
}

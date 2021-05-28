import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { RegenerateServiceApiKey } from '@/domain/service/regenerate-service-api-key'
import { Service } from '@/domain/service/service'
import { fakeService } from './service'

export class MockRegenerateKey implements RegenerateServiceApiKey {
  public async regenerate(
    currentKey: string,
    maintainerId: string
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    return { ...fakeService, apiKey: '_tpFy9g3Gai48G' }
  }
}

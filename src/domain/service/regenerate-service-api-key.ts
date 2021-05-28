import { UnauthorizedMaintainerError } from './errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from './errors/unregistered-api-key'
import { Service } from './service'

export interface RegenerateServiceApiKey {
  regenerate(
    currentKey: string,
    maintainerId: string
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError>
}

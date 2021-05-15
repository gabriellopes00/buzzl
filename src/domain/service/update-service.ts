import { UnauthorizedMaintainerError } from './errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from './errors/unregistered-api-key'
import { Service } from './service'

export interface UpdateService {
  update(
    apiKey: string,
    userId: string,
    newData: Partial<Pick<Service, 'name' | 'description' | 'isActive'>>
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError>
}

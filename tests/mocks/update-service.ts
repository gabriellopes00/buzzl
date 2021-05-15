import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { Service } from '@/domain/service/service'
import { UpdateService } from '@/domain/service/update-service'
import { fakeService } from './service'

export class MockUpdateService implements UpdateService {
  async update(
    apKey: string,
    userId: string,
    data: Partial<Pick<Service, 'name' | 'description' | 'isActive'>>
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    return fakeService
  }
}

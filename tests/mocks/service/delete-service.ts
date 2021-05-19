import { DeleteService, DeleteServiceParams } from '@/domain/service/delete-service'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'

export class MockDeleteService implements DeleteService {
  async delete(
    data: DeleteServiceParams
  ): Promise<void | UnregisteredApiKeyError | UnauthorizedMaintainerError> {}
}

import { DeleteService } from '@/domain/service/delete-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'

export class MockDeleteService implements DeleteService {
  async delete(apiKey: string): Promise<void | UnregisteredApiKeyError> {}
}

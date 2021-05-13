import { UnauthorizedMaintainerError } from './errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from './errors/unregistered-api-key'

export interface DeleteServiceParams {
  apiKey: string
  userId: string
}

export interface DeleteService {
  delete(
    data: DeleteServiceParams
  ): Promise<void | UnregisteredApiKeyError | UnauthorizedMaintainerError>
}

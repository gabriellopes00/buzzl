import { UnregisteredApiKeyError } from './errors/unregistered-api-key'

export interface DeleteService {
  delete(apiKey: string): Promise<void | UnregisteredApiKeyError>
}

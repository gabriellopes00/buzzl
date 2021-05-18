import { UnregisteredEmailError } from '../user/errors/unregistered-email'
import { UnauthorizedMaintainerError } from './errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from './errors/unregistered-api-key'
import { Service } from './service'

export interface TransferService {
  transfer(
    apiKey: string,
    currentMaintainerId: string,
    newMaintainerEmail: string
  ): Promise<
    Service | UnregisteredEmailError | UnregisteredApiKeyError | UnauthorizedMaintainerError
  >
}

import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { Service } from '@/domain/service/service'
import { TransferServiceMaintainer } from '@/domain/service/transfer-maintainer'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { fakeService } from './service'

export class MockTransferMaintainer implements TransferServiceMaintainer {
  public async transfer(
    apiKey: string,
    currentMaintainerId: string,
    newMaintainerEmail: string
  ): Promise<
    Service | UnregisteredEmailError | UnregisteredApiKeyError | UnauthorizedMaintainerError
  > {
    return { ...fakeService, maintainer: '12ec4cef-c474-450e-b719-b649fa12dc46' }
  }
}

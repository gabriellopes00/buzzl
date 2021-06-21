import { AddService, ServiceParams } from '@/domain/service/add-service'
import { DeleteService, DeleteServiceParams } from '@/domain/service/delete-service'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { ListServiceByUser } from '@/domain/service/list-service-by-user'
import { RegenerateServiceApiKey } from '@/domain/service/regenerate-service-api-key'
import { Service } from '@/domain/service/service'
import { TransferService } from '@/domain/service/transfer-service'
import { UpdateService } from '@/domain/service/update-service'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { fakeService } from './service'

export class MockDeleteService implements DeleteService {
  async delete(
    data: DeleteServiceParams
  ): Promise<void | UnregisteredApiKeyError | UnauthorizedMaintainerError> {}
}

export class MockListServiceByUser implements ListServiceByUser {
  async list(userId: string): Promise<Service[]> {
    return [fakeService]
  }
}

export class MockRegenerateKey implements RegenerateServiceApiKey {
  public async regenerate(
    currentKey: string,
    maintainerId: string
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    return { ...fakeService, apiKey: '_tpFy9g3Gai48G' }
  }
}

export class MockTransferService implements TransferService {
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

export class MockUpdateService implements UpdateService {
  async update(
    apKey: string,
    userId: string,
    data: Partial<Pick<Service, 'name' | 'description' | 'isActive'>>
  ): Promise<Service | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    return fakeService
  }
}

export class MockAddService implements AddService {
  async add(data: ServiceParams): Promise<Service> {
    return fakeService
  }
}

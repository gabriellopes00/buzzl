import { Service } from '@/domain/service/service'
import { ServiceJoinMaintainer, ServiceRepository } from '@/usecases/ports/service-repository'
import { fakeService } from './service'
import { fakeUser } from './user'

/*
  Mock methods and classes always return expect value to make test pass.
  If there is a need to change this value, the methods must be mocked with the different wanted value.
*/

export class MockServiceRepository implements ServiceRepository {
  async add(data: Service): Promise<Service> {
    return fakeService
  }

  async findOneJoinMaintainer(criteria: {
    id?: string
    apiKey?: string
  }): Promise<ServiceJoinMaintainer> {
    return { ...fakeService, maintainer: fakeUser }
  }

  async delete(by: { id?: string; apiKey?: string }): Promise<void> {}
}

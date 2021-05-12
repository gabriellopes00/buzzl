import { Service } from '@/domain/service/service'
import { ServiceRepository } from '@/usecases/ports/service-repository'
import { fakeService } from './service'

/*
  Mock methods and classes always return expect value to make test pass.
  If there is a need to change this value, the methods must be mocked with the different wanted value.
*/

export class MockServiceRepository implements ServiceRepository {
  async add(data: Service): Promise<Service> {
    return fakeService
  }

  async exists(by: { id?: string; apiKey?: string }): Promise<boolean> {
    return true
  }

  async delete(by: { id?: string; apiKey?: string }): Promise<void> {}
}

import { Service } from '@/domain/service/service'
import { ServiceJoinMaintainer, ServiceRepository } from '@/usecases/ports/service-repository'
import { fakeService } from './service'
import { fakeUser } from '../user/user'

export class MockServiceRepository implements ServiceRepository {
  async add(data: Service): Promise<Service> {
    return fakeService
  }

  async findAll(criteria?: { maintainer?: string }): Promise<Service[]> {
    return [fakeService]
  }

  async update(data: Service): Promise<Service> {
    return fakeService
  }

  async findOneJoinMaintainer(criteria: {
    id?: string
    apiKey?: string
  }): Promise<ServiceJoinMaintainer> {
    return { ...fakeService, maintainer: fakeUser }
  }

  async delete(criteria: { id?: string; apiKey?: string }): Promise<void> {}
  async findOne(criteria: { id?: string; apiKey?: string }): Promise<Service> {
    return fakeService
  }

  async exists(criteria: { id?: string; apiKey?: string }): Promise<boolean> {
    return true
  }
}

import { Service } from '@/domain/service/service'
import { AddService, ServiceParams } from '@/domain/service/add-service'
import { fakeService } from './service'

export class MockAddService implements AddService {
  async add(data: ServiceParams): Promise<Service> {
    return fakeService
  }
}

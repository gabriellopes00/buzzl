import { Service } from '@/domain/entities/service'
import { AddService, ServiceParams } from '@/domain/usecases/service/add-service'
import { fakeService } from './service'

export class MockAddService implements AddService {
  async add(data: ServiceParams): Promise<Service> {
    return fakeService
  }
}

import { ListServiceByUser } from '@/domain/service/list-service-by-user'
import { Service } from '@/domain/service/service'
import { fakeService } from './service'

export class MockListServiceByUser implements ListServiceByUser {
  async list(userId: string): Promise<Service[]> {
    return [fakeService]
  }
}

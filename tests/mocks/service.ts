import { Service } from '@/domain/service/service'
import { ServiceParams } from '@/domain/service/add-service'
import { MockAPIKeyGenerator } from './api-key-generator'
import { fakeUser } from './user'
import { MockUUIDGenerator } from './uuid-generator'

const uuidGenerator = new MockUUIDGenerator()
const apiKeyGenerator = new MockAPIKeyGenerator()

export const fakeService: Service = {
  id: uuidGenerator.generate(),
  apiKey: apiKeyGenerator.generate(),
  name: 'Service Name',
  description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  isActive: true,
  maintainer: fakeUser.id
}

export const fakeServiceParams: { name: string; description?: string; userId: string } = {
  name: 'Service Name',
  description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  userId: fakeUser.id
}

export const addServiceDto: ServiceParams = {
  name: 'Service Name',
  description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  maintainer: fakeUser.id
}

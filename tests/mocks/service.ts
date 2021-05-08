import { Service } from '@/domain/entities/service'
import { ServiceParams } from '@/domain/usecases/service/add-service'
import { AddServiceDto } from '@/usecases/implementation/service/dtos/add-service'
import { MockApiKeyGenerator } from './api-key-generator'
import { fakeUser } from './user'
import { MockUUIDGenerator } from './uuid-generator'

const uuidGenerator = new MockUUIDGenerator()
const apiKeyGenerator = new MockApiKeyGenerator()

export const fakeService: Service = {
  id: uuidGenerator.generate(),
  apiKey: apiKeyGenerator.generate(),
  name: 'Service Name',
  description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  isActive: true,
  maintainer: fakeUser.id
}

export const fakeServiceParams: ServiceParams = {
  name: 'Service Name',
  description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit'
}

export const addServiceDto: AddServiceDto = {
  name: 'Service Name',
  description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  maintainer: fakeUser.id
}

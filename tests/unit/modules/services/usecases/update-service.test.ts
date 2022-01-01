import { Service } from '@/modules/services/domain/entities/service'
import { ServiceIdNotFound } from '@/modules/services/domain/usecases/errors/service-id-not-found'
import { InvalidNameError } from '@/modules/services/domain/value-objects/errors/invalid-name-error'
import { ForbiddenServiceUpdate } from '@/modules/services/usecases/errors/forbidden-service-update-error'
import { UpdateService } from '@/modules/services/usecases/update-service'
import { InMemoryServiceRepository } from '@t/mocks/infra/repositories/in-memory-service-repository'

describe('Update Service Usecase', () => {
  const inMemoryServiceRepository = new InMemoryServiceRepository()
  const sut = new UpdateService(inMemoryServiceRepository)

  const maintainerAccountId = 'd1680749-892a-4417-9648-4dce4aabffe8'
  const serviceId = 'de384b4fa-cf56-4ab0-a54d-e293a30f6ab7'
  const service = Service.create(
    { name: 'My Service', isActive: true, maintainerAccountId },
    serviceId
  ).value as Service

  beforeEach(() => inMemoryServiceRepository.truncate())

  describe('Find Service', () => {
    it('Should call repository > findById with given service id', async () => {
      const findSpy = jest.spyOn(inMemoryServiceRepository, 'findById')
      await sut.update(serviceId, maintainerAccountId, { name: 'New Service Name' })
      expect(findSpy).toHaveBeenCalledWith(serviceId)
    })

    it('Should return an error if no service is found with given id', async () => {
      const result = await sut.update(serviceId, maintainerAccountId, { name: 'New Service Name' })
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toBeInstanceOf(ServiceIdNotFound)
    })

    it('Should throw if repository throws', async () => {
      jest.spyOn(inMemoryServiceRepository, 'findById').mockRejectedValueOnce(new Error())
      const promise = sut.update(serviceId, maintainerAccountId, { name: 'New Service Name' })
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Assign New Properties', () => {
    it('Should not update the service if receive an invalid name', async () => {
      await inMemoryServiceRepository.save(service)
      const result = await sut.update(serviceId, maintainerAccountId, { name: 'a' })
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toBeInstanceOf(InvalidNameError)
    })

    it('Should not update the service if receive request from a non-owner account', async () => {
      await inMemoryServiceRepository.save(service)
      const result = await sut.update(serviceId, 'dbe605c0-fe4f-47d2-802d-0eed3b381518', {
        name: 'New Name'
      })
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toBeInstanceOf(ForbiddenServiceUpdate)
    })

    it('Should call repository > save with updated service properties', async () => {
      await inMemoryServiceRepository.save(service)
      const saveSpy = jest.spyOn(inMemoryServiceRepository, 'save')
      await sut.update(serviceId, maintainerAccountId, { name: 'New Name' })
      expect(saveSpy).toHaveBeenCalledWith({
        ...service,
        data: expect.objectContaining({ name: 'New Name' })
      })
    })

    it('Should update only received service properties', async () => {
      await inMemoryServiceRepository.save(service)

      const svc = await inMemoryServiceRepository.findById(serviceId)
      expect(svc.description).toBeUndefined()

      await sut.update(serviceId, maintainerAccountId, { description: 'lorem ipsum dolor sit...' })

      const { name, description } = await inMemoryServiceRepository.findById(serviceId)
      expect(name).toBe(service.name)
      expect(description).toBe('lorem ipsum dolor sit...')
    })
  })

  it('Should return a service with updated properties on success', async () => {
    await inMemoryServiceRepository.save(service)
    const result = await sut.update(serviceId, maintainerAccountId, {
      name: 'New Name',
      description: 'lorem ipsum'
    })
    expect(result.isRight()).toBeTruthy()
    const svc = result.value as Service
    expect(svc.name).toBe('New Name')
    expect(svc.description).toBe('lorem ipsum')
  })
})

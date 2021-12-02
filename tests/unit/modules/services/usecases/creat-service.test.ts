import { Service } from '@/modules/services/domain/entities/service'
import { CreateServiceParams } from '@/modules/services/domain/usecases/create-service'
import { DbCreateService } from '@/modules/services/usecases/create-service'
import { InMemoryServiceRepository } from '@t/mocks/infra/repositories/in-memory-service-repository'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'

describe('Create Service Usecase', () => {
  const mockedUUIDGenerator = new MockedUUIDGenerator()
  const inMemoryServiceRepository = new InMemoryServiceRepository()
  const sut = new DbCreateService(inMemoryServiceRepository, mockedUUIDGenerator)

  const maintainerAccountId = 'd1680749-892a-4417-9648-4dce4aabffe8'
  const data: CreateServiceParams = { name: 'My First Service', isActive: true }

  describe('Repository', () => {
    it('Should call service repository with correct values', async () => {
      const createSpy = jest.spyOn(inMemoryServiceRepository, 'create')
      await sut.create(data, maintainerAccountId)
      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          ...data,
          id: mockedUUIDGenerator.generate(),
          maintainerAccountId
        })
      )
    })

    it('Should throw if repository throws', async () => {
      jest.spyOn(inMemoryServiceRepository, 'create').mockRejectedValueOnce(new Error())
      const promise = sut.create(data, maintainerAccountId)
      await expect(promise).rejects.toThrow()
    })
  })

  it('Should return a service on success', async () => {
    const result = await sut.create(data, maintainerAccountId)
    expect(result.isRight()).toBeTruthy()

    const service = result.value as Service
    expect(service.name).toEqual(data.name)
    expect(service.id).toBe(mockedUUIDGenerator.generate())
    expect(service.maintainerAccountId).toEqual(maintainerAccountId)
  })
})

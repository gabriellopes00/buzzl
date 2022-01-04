import { Service } from '@/modules/services/domain/entities/service'
import { CreateService, CreateServiceParams } from '@/modules/services/usecases/create-service'
import { InMemoryServiceRepository } from '@t/mocks/infra/repositories/in-memory-service-repository'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'

describe('Create Service Usecase', () => {
  const mockedUUIDGenerator = new MockedUUIDGenerator()
  const inMemoryServiceRepository = new InMemoryServiceRepository()
  const sut = new CreateService(inMemoryServiceRepository, mockedUUIDGenerator)

  const maintainerAccountId = 'd1680749-892a-4417-9648-4dce4aabffe8'
  const data: CreateServiceParams = { name: 'My First Service', isActive: true }

  describe('Repository', () => {
    it('Should call service repository with correct values', async () => {
      const createSpy = jest.spyOn(inMemoryServiceRepository, 'save')
      await sut.execute(data, maintainerAccountId)
      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          ...data,
          id: mockedUUIDGenerator.generate(),
          maintainerAccountId
        })
      )
    })

    it('Should throw if repository throws', async () => {
      jest.spyOn(inMemoryServiceRepository, 'save').mockRejectedValueOnce(new Error())
      const promise = sut.execute(data, maintainerAccountId)
      await expect(promise).rejects.toThrow()
    })
  })

  it('Should return a service on success', async () => {
    const result = await sut.execute(data, maintainerAccountId)
    expect(result.isRight()).toBeTruthy()

    const service = result.value as Service
    expect(service.name).toEqual(data.name)
    expect(service.id).toBe(mockedUUIDGenerator.generate())
    expect(service.maintainerAccountId).toEqual(maintainerAccountId)
  })
})

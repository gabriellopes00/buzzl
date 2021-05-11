import { DbAddService } from '@/usecases/service/add-service'
import { MockAPIKeyGenerator } from '../../mocks/api-key-generator'
import { addServiceDto, fakeService } from '../../mocks/service'
import { MockServiceRepository } from '../../mocks/service-repository'
import { MockUUIDGenerator } from '../../mocks/uuid-generator'

describe('Add Service Usecase', () => {
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const mockAPIKeyGenerator = new MockAPIKeyGenerator() as jest.Mocked<MockAPIKeyGenerator>
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbAddService(mockUUIDGenerator, mockAPIKeyGenerator, mockServiceRepository)

  describe('UUID Generator', () => {
    it('Should call UUIDGenerator once before generate api key', async () => {
      const generateUUID = jest.spyOn(mockUUIDGenerator, 'generate')
      await sut.add(null)
      expect(generateUUID).toHaveBeenCalled()
    })
  })

  describe('Api Key Generator', () => {
    it('Should call api key generator once before service registration', async () => {
      const generate = jest.spyOn(mockAPIKeyGenerator, 'generate')
      await sut.add(null)
      expect(generate).toHaveBeenCalled()
    })
  })

  describe('Service Repository', () => {
    it('Should call uuid generator and api key generator before call service repository', async () => {
      const generateUUID = jest.spyOn(mockUUIDGenerator, 'generate')
      const generateKey = jest.spyOn(mockAPIKeyGenerator, 'generate')
      const add = jest.spyOn(mockServiceRepository, 'add')
      await sut.add(null)

      // ensure UUID and apiKey be generated before call service repository
      const generateUUIDCall = generateUUID.mock.invocationCallOrder[0]
      const generateKeyCall = generateKey.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(generateUUIDCall).toBeLessThan(generateKeyCall)
      expect(generateKeyCall).toBeLessThan(addCall)
    })

    it('Should call service repository add method with correct values', async () => {
      const add = jest.spyOn(mockServiceRepository, 'add')
      await sut.add(addServiceDto)
      expect(add).toHaveBeenCalledWith({
        id: mockUUIDGenerator.generate(),
        apiKey: mockAPIKeyGenerator.generate(),
        ...fakeService,
        isActive: true
      })
    })

    it('Should return created service on success', async () => {
      const result = await sut.add(addServiceDto)
      expect(result).toEqual(fakeService)
    })

    it('Should throws if repository add method throws', async () => {
      mockServiceRepository.add.mockRejectedValueOnce(new Error())
      const error = sut.add(addServiceDto)
      await expect(error).rejects.toThrow()
    })
  })
})

import { DbAddService } from '@/usecases/implementation/add-service'
import { MockApiKeyGenerator } from '../../mocks/api-key-generator'
import { MockUUIDGenerator } from '../../mocks/uuid-generator'

describe('Add Service Usecase', () => {
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const mockApiKeyGenerator = new MockApiKeyGenerator() as jest.Mocked<MockApiKeyGenerator>
  const sut = new DbAddService(mockUUIDGenerator, mockApiKeyGenerator)

  describe('UUID Generator', () => {
    it('Should call UUIDGenerator once before generate api key', async () => {
      const generateUUID = jest.spyOn(mockUUIDGenerator, 'generate')
      const generateKey = jest.spyOn(mockApiKeyGenerator, 'generate')
      await sut.add(null)
      expect(generateUUID).toHaveBeenCalled()

      // ensure UUID be generated *before* call api key generator
      const generateCall = generateUUID.mock.invocationCallOrder[0]
      const generateKeyCall = generateKey.mock.invocationCallOrder[0]
      expect(generateCall).toBeLessThan(generateKeyCall)
    })
  })

  describe('Api Key Generator', () => {
    it('Should call api key generator once before service registration', async () => {
      const generate = jest.spyOn(mockApiKeyGenerator, 'generate')
      await sut.add(null)
      expect(generate).toHaveBeenCalled()
    })
  })
})

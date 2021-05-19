import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbAddFeedback } from '@/usecases/feedback/add-feedback'
import { fakeFeedbackParams } from '../../../mocks/feedback'
import { MockFeedbackRepository } from '../../../mocks/feedback-repository'
import { MockServiceRepository } from '../../../mocks/service-repository'
import { MockUUIDGenerator } from '../../../mocks/uuid-generator'

describe('Add Feedback Usecase', () => {
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockFeedbackRepository = new MockFeedbackRepository() as jest.Mocked<MockFeedbackRepository>
  const sut = new DbAddFeedback(mockServiceRepository, mockUUIDGenerator, mockFeedbackRepository)

  describe('Service Repository', () => {
    it('Should call service repository exists method with correct value', async () => {
      const exists = jest.spyOn(mockServiceRepository, 'exists')
      await sut.add(fakeFeedbackParams)
      expect(exists).toHaveBeenCalledWith({ apiKey: fakeFeedbackParams.service })
    })

    it('Should return an UnregisteredApiKeyError if receive an unregistered api key', async () => {
      mockServiceRepository.exists.mockResolvedValueOnce(false)
      const result = await sut.add(fakeFeedbackParams)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.exists.mockRejectedValueOnce(new Error())
      const error = sut.add(fakeFeedbackParams)
      await expect(error).rejects.toThrow()
    })
  })

  describe('UUID Generator', () => {
    it('Should call uuid generator once with correct value before call feedback repository', async () => {
      const generateUUID = jest.spyOn(mockUUIDGenerator, 'generate')
      const add = jest.spyOn(mockFeedbackRepository, 'add')
      await sut.add(fakeFeedbackParams)

      // ensure UUID be generated before call feedback repository
      const generateUUIDCall = generateUUID.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(generateUUIDCall).toBeLessThan(addCall)
    })

    it('Should throw if uuid generator throws', async () => {
      mockUUIDGenerator.generate.mockImplementationOnce(() => {
        throw new Error()
      })
      const error = sut.add(fakeFeedbackParams)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Feedback Repository', () => {
    it('Should call feedback repository add with correct values', async () => {
      const add = jest.spyOn(mockFeedbackRepository, 'add')
      await sut.add(fakeFeedbackParams)
      expect(add).toHaveBeenCalledWith({ ...fakeFeedbackParams, id: mockUUIDGenerator.generate() })
    })

    it('Should throw if feedback repository throws', async () => {
      mockFeedbackRepository.add.mockRejectedValueOnce(new Error())
      const error = sut.add(fakeFeedbackParams)
      await expect(error).rejects.toThrow()
    })
  })
})

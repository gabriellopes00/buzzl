import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbAddFeedback } from '@/usecases/feedback/add-feedback'
import { fakeFeedbackParams } from '@t/mocks/feedback/feedback'
import { MockFeedbackRepository } from '@t/mocks/feedback/feedback-repository'
import { MockServiceRepository } from '@t/mocks/service/service-repository'
import { MockUUIDGenerator } from '@t/mocks/common/uuid-generator'
import { fakeService } from '@t/mocks/service/service'
import { InactiveServiceError } from '@/domain/service/errors/inactive-service'

describe('Add Feedback Usecase', () => {
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockFeedbackRepository = new MockFeedbackRepository() as jest.Mocked<MockFeedbackRepository>
  const sut = new DbAddFeedback(mockServiceRepository, mockUUIDGenerator, mockFeedbackRepository)

  describe('Service Repository', () => {
    it('Should call service repository findOne method with correct value', async () => {
      const findOne = jest.spyOn(mockServiceRepository, 'findOne')
      await sut.add(fakeFeedbackParams)
      expect(findOne).toHaveBeenCalledWith({ apiKey: fakeFeedbackParams.service })
    })

    it('Should return an UnregisteredApiKeyError if receive an unregistered api key', async () => {
      mockServiceRepository.findOne.mockResolvedValueOnce(null)
      const result = await sut.add(fakeFeedbackParams)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should return an InactiveServiceError if feedback service is not actives', async () => {
      mockServiceRepository.findOne.mockResolvedValueOnce({ ...fakeService, isActive: false })
      const result = await sut.add(fakeFeedbackParams)
      expect(result).toBeInstanceOf(InactiveServiceError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.findOne.mockRejectedValueOnce(new Error())
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

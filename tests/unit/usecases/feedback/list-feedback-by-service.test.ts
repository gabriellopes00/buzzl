import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbListFeedbackByService } from '@/usecases/feedback/list-feedback-by-service'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { MockFeedbackRepository } from '@t/mocks/feedback/feedback-repository'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/service-repository'

describe('List Feedback By Service Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockFeedbackRepository = new MockFeedbackRepository() as jest.Mocked<MockFeedbackRepository>
  const sut = new DbListFeedbackByService(mockServiceRepository, mockFeedbackRepository)

  describe('Service Repository', () => {
    it('Should call service repository exists method with correct value', async () => {
      const exists = jest.spyOn(mockServiceRepository, 'exists')
      await sut.list(fakeService.apiKey)
      expect(exists).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })
    })

    it('Should return an UnregisteredApiKeyError if receive an unregistered api key', async () => {
      mockServiceRepository.exists.mockResolvedValueOnce(false)
      const result = await sut.list(fakeService.apiKey)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.exists.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeService.apiKey)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Feedback Repository', () => {
    it('Should call feedback repository list with correct values', async () => {
      const findAll = jest.spyOn(mockFeedbackRepository, 'findAll')
      await sut.list(fakeService.apiKey)
      expect(findAll).toHaveBeenCalledWith({ service: fakeService.apiKey })
    })

    it('Should return found feedbacks on success', async () => {
      const result = await sut.list(fakeService.apiKey)
      expect(result).toEqual([fakeFeedback])
    })

    it('Should return an array null if found no feedbacks', async () => {
      mockFeedbackRepository.findAll.mockResolvedValueOnce([null])
      const result = await sut.list(fakeService.apiKey)
      expect(result).toEqual([null])
    })

    it('Should throw if feedback repository throws', async () => {
      mockFeedbackRepository.findAll.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeService.apiKey)
      await expect(error).rejects.toThrow()
    })
  })
})

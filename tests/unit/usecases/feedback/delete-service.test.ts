import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbDeleteFeedback } from '@/usecases/feedback/delete-feedback'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { MockFeedbackRepository } from '@t/mocks/feedback/feedback-repository'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/service-repository'
import { fakeUser } from '@t/mocks/user/user'

describe('Delete Feedback Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockFeedbackRepository = new MockFeedbackRepository() as jest.Mocked<MockFeedbackRepository>
  const sut = new DbDeleteFeedback(mockServiceRepository, mockFeedbackRepository)

  describe('Service Repository', () => {
    it('Should call service repository findOneJoinMaintainer method with correct value', async () => {
      const findOne = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
      await sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      expect(findOne).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })
    })

    it('Should return an UnregisteredApiKeyError if receive an unregistered api key', async () => {
      mockServiceRepository.findOneJoinMaintainer.mockResolvedValueOnce(null)
      const result = await sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should return an UnauthorizedMaintainerError if receive request from an unauthorized maintainer', async () => {
      const result = await sut.delete(fakeFeedback.id, fakeService.apiKey, 'unauthorized')
      expect(result).toBeInstanceOf(UnauthorizedMaintainerError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.findOneJoinMaintainer.mockRejectedValueOnce(new Error())
      const error = sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Feedback Repository', () => {
    it('Should call feedback repository delete method with correct values', async () => {
      const del = jest.spyOn(mockFeedbackRepository, 'delete')
      await sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      expect(del).toHaveBeenCalledWith({ id: fakeFeedback.id })
    })

    it('Should return an UnregisteredFeedbackError if receive one', async () => {
      jest.spyOn(mockFeedbackRepository, 'findOne').mockResolvedValueOnce(null)
      const result = await sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      expect(result).toBeInstanceOf(UnregisteredFeedbackError)
    })

    it('Should call feedback repository delete method with correct value', async () => {
      const del = jest.spyOn(mockFeedbackRepository, 'delete')
      await sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      expect(del).toHaveBeenCalledWith({ id: fakeFeedback.id })
    })

    it('Should not call feedback repository delete if there is no one', async () => {
      jest.spyOn(mockFeedbackRepository, 'findOne').mockResolvedValueOnce(null)
      const del = jest.spyOn(mockFeedbackRepository, 'delete')
      await sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      expect(del).not.toHaveBeenCalledWith({ id: fakeFeedback.id })
    })

    it('Should throw if feedback repository throws', async () => {
      mockFeedbackRepository.delete.mockRejectedValueOnce(new Error())
      const error = sut.delete(fakeFeedback.id, fakeService.apiKey, fakeUser.id)
      await expect(error).rejects.toThrow()
    })
  })
})

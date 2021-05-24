import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import {
  ListFeedbackByServiceController,
  ListFeedbackResponse
} from '@/presentation/controllers/feedback/list-feedback-by-service'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockListFeedbackByService } from '@t/mocks/feedback/list-feedback-by-service'
import { fakeService } from '@t/mocks/service/service'

describe('List Feedback By Service Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockListFeedback = new MockListFeedbackByService() as jest.Mocked<MockListFeedbackByService>
  const sut = new ListFeedbackByServiceController(mockValidator, mockListFeedback)

  const fakeRequest = { service: fakeService.apiKey }

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeRequest)
      expect(validate).toHaveBeenCalledWith(fakeRequest)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeRequest)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return an 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeRequest)
      expect(response).toEqual(serverError(new Error()))
    })

    it('Should call validator before call listFeedback usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const list = jest.spyOn(mockListFeedback, 'list')
      await sut.handle(fakeRequest)

      const validateCall = validate.mock.invocationCallOrder[0]
      const listCall = list.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(listCall)
    })
  })

  describe('List Feedback By User Usecase', () => {
    it('Should not call listFeedback usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const list = jest.spyOn(mockListFeedback, 'list')
      await sut.handle(fakeRequest)
      expect(list).not.toHaveBeenCalled()
    })

    it('Should return 200 response on success', async () => {
      const response = await sut.handle(fakeRequest)
      const feedbacks = await mockListFeedback.list(fakeRequest.service)

      expect(response).toEqual(
        ok({
          count: 6,
          categories: {
            COMMENT: {
              count: 2,
              percent: 33.33
            },
            ISSUE: {
              count: 2,
              percent: 33.33
            },
            IDEA: {
              count: 2,
              percent: 33.33
            },
            OTHER: {
              count: 0,
              percent: 0
            }
          },
          feedbacks: feedbacks
        } as ListFeedbackResponse)
      )
    })

    it('Should return 200 response on success', async () => {
      mockListFeedback.list.mockResolvedValueOnce(null)
      const response = await sut.handle(fakeRequest)
      expect(response).toEqual(noContent())
    })

    it('Should return 400 response if receive an unregistered api key', async () => {
      mockListFeedback.list.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeRequest)
      expect(response).toEqual(badRequest(new UnregisteredApiKeyError('')))
    })

    it('Should return a 500 response if listService throws', async () => {
      mockListFeedback.list.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeRequest)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

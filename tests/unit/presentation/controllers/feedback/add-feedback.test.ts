import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { AddFeedbackController } from '@/presentation/controllers/feedback/add-feedback'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockAddFeedback } from '@t/mocks/feedback/usecases'
import { fakeFeedbackParams } from '@t/mocks/feedback/feedback'

describe('Add Feedback Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockAddFeedback = new MockAddFeedback() as jest.Mocked<MockAddFeedback>
  const sut = new AddFeedbackController(mockValidator, mockAddFeedback)

  describe('Validation', () => {
    it('Should call validator before call addFeedback usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const add = jest.spyOn(mockAddFeedback, 'add')
      await sut.handle(fakeFeedbackParams)

      expect(validate).toHaveBeenCalledWith(fakeFeedbackParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(addCall)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeFeedbackParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return an 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeFeedbackParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('AddFeedback Usecase', () => {
    it('Should not call addFeedback usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const add = jest.spyOn(mockAddFeedback, 'add')
      await sut.handle(fakeFeedbackParams)
      expect(add).not.toHaveBeenCalled()
    })

    it('Should return 204 response on success', async () => {
      const response = await sut.handle(fakeFeedbackParams)
      expect(response).toEqual(noContent())
    })

    it('Should return 400 response if receive an unregistered api key', async () => {
      mockAddFeedback.add.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeFeedbackParams)
      expect(response).toEqual(badRequest(new UnregisteredApiKeyError('')))
    })

    it('Should return 400 response if receive feedback service is not active', async () => {
      mockAddFeedback.add.mockResolvedValueOnce(new InactiveServiceError(''))
      const response = await sut.handle(fakeFeedbackParams)
      expect(response).toEqual(badRequest(new InactiveServiceError('')))
    })

    it('Should return a 500 response if addService throws', async () => {
      mockAddFeedback.add.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeFeedbackParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

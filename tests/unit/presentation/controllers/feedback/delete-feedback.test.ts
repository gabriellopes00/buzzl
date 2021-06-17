import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import {
  DeleteFeedbackController,
  DeleteFeedbackParams
} from '@/presentation/controllers/feedback/delete-feeedback'
import {
  badRequest,
  conflict,
  noContent,
  serverError,
  unauthorized
} from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockDeleteFeedback } from '@t/mocks/feedback/delete-feedback'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'

describe('Delete Feedback Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockDeleteFeedback = new MockDeleteFeedback() as jest.Mocked<MockDeleteFeedback>
  const sut = new DeleteFeedbackController(mockValidator, mockDeleteFeedback)

  const fakeParams: DeleteFeedbackParams = {
    id: fakeFeedback.id,
    service: fakeService.apiKey,
    userId: fakeUser.id
  }

  describe('Validation', () => {
    it('Should call validator before call deleteFeedback usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const del = jest.spyOn(mockDeleteFeedback, 'delete')
      await sut.handle(fakeParams)

      expect(validate).toHaveBeenCalledWith(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const delCall = del.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(delCall)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return an 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('DeleteFeedback Usecase', () => {
    it('Should not call addFeedback usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const del = jest.spyOn(mockDeleteFeedback, 'delete')
      await sut.handle(fakeParams)
      expect(del).not.toHaveBeenCalled()
    })

    it('Should return 204 response on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return 400 response if receive an unregistered api key', async () => {
      mockDeleteFeedback.delete.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new UnregisteredApiKeyError('')))
    })

    it('Should return 409 response if receive an unregistered feedback', async () => {
      mockDeleteFeedback.delete.mockResolvedValueOnce(new UnregisteredFeedbackError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredFeedbackError('')))
    })

    it('Should return 401 response if receive request from an unauthorized maintainer', async () => {
      mockDeleteFeedback.delete.mockResolvedValueOnce(new UnauthorizedMaintainerError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized(new UnauthorizedMaintainerError('')))
    })

    it('Should return a 500 response if addService throws', async () => {
      mockDeleteFeedback.delete.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

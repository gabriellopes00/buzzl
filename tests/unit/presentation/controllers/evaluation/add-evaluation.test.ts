import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { AddEvaluationController } from '@/presentation/controllers/evaluation/add-evaluation'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockAddEvaluation } from '@t/mocks/evaluation/usecases'
import { fakeEvaluationParams } from '@t/mocks/evaluation/evaluation'

describe('Add Evaluation Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockAddEvaluation = new MockAddEvaluation() as jest.Mocked<MockAddEvaluation>
  const sut = new AddEvaluationController(mockValidator, mockAddEvaluation)

  describe('Validation', () => {
    it('Should call validator before call addFeedback usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const add = jest.spyOn(mockAddEvaluation, 'add')
      await sut.handle(fakeEvaluationParams)

      expect(validate).toHaveBeenCalledWith(fakeEvaluationParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(addCall)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeEvaluationParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return an 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeEvaluationParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('AddEvaluation Usecase', () => {
    it('Should not call addEvaluation usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const add = jest.spyOn(mockAddEvaluation, 'add')
      await sut.handle(fakeEvaluationParams)
      expect(add).not.toHaveBeenCalled()
    })

    it('Should return 204 response on success', async () => {
      const response = await sut.handle(fakeEvaluationParams)
      expect(response).toEqual(noContent())
    })

    it('Should return 400 response if receive an unregistered api key', async () => {
      mockAddEvaluation.add.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeEvaluationParams)
      expect(response).toEqual(badRequest(new UnregisteredApiKeyError('')))
    })

    it('Should return 400 response if receive feedback service is not active', async () => {
      mockAddEvaluation.add.mockResolvedValueOnce(new InactiveServiceError(''))
      const response = await sut.handle(fakeEvaluationParams)
      expect(response).toEqual(badRequest(new InactiveServiceError('')))
    })

    it('Should return a 500 response if addService throws', async () => {
      mockAddEvaluation.add.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeEvaluationParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

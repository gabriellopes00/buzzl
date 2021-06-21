import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { GetNPSController } from '@/presentation/controllers/evaluation/get-nps'
import { badRequest, forbidden, noContent, ok, serverError } from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { fakeEvaluationParams } from '@t/mocks/evaluation/evaluation'
import { MockListEvaluation, MockNPSService } from '@t/mocks/evaluation/usecases'
import { fakeUser } from '@t/mocks/user/user'

describe('Get NPS Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockListEvaluation = new MockListEvaluation() as jest.Mocked<MockListEvaluation>
  const mockCalcNPS = new MockNPSService() as jest.Mocked<MockNPSService>
  const sut = new GetNPSController(mockValidator, mockListEvaluation, mockCalcNPS)

  const fakeParams = { ...fakeEvaluationParams, userId: fakeUser.id }

  describe('Validation', () => {
    it('Should call validator before call listEvaluation usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeParams)
      expect(validate).toHaveBeenCalledWith(fakeParams)
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

  describe('ListEvaluation Usecase', () => {
    it('Should not call listEvaluation usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const list = jest.spyOn(mockListEvaluation, 'list')
      await sut.handle(fakeParams)
      expect(list).not.toHaveBeenCalled()
    })

    it('Should return 200 response with nps calculated on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok(expect.any(Object)))
    })

    it('Should return 204 response if there is no evaluation', async () => {
      mockListEvaluation.list.mockResolvedValueOnce(null)
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return 400 response if receive an unregistered api key', async () => {
      mockListEvaluation.list.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new UnregisteredApiKeyError('')))
    })

    it('Should return 403 response if receive request from an unauthorized user', async () => {
      mockListEvaluation.list.mockResolvedValueOnce(new UnauthorizedMaintainerError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(forbidden(new UnauthorizedMaintainerError('')))
    })

    it('Should return a 500 response if listService throws', async () => {
      mockListEvaluation.list.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

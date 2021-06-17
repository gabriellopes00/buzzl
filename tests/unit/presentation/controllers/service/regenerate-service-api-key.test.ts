import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { RegenerateApiKeyController } from '@/presentation/controllers/service/regenerate-service-api-key'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockRegenerateKey } from '@t/mocks/service/regenerate-api-key'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'

describe('Regenerate Service Api Key Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockRegenerateKey = new MockRegenerateKey() as jest.Mocked<MockRegenerateKey>
  const sut = new RegenerateApiKeyController(mockValidator, mockRegenerateKey)

  const fakeParams = { apiKey: fakeService.apiKey, userId: fakeUser.id }

  describe('Validation', () => {
    it('Should call validator before call regenerateKey usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const regenerate = jest.spyOn(mockRegenerateKey, 'regenerate')
      await sut.handle(fakeParams)

      expect(validate).toHaveBeenCalledWith(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const regenerateCall = regenerate.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(regenerateCall)
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

  describe('Regenerate API Key Usecase', () => {
    it('Should not call regenerateKey usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const regenerate = jest.spyOn(mockRegenerateKey, 'regenerate')
      await sut.handle(fakeParams)
      expect(regenerate).not.toHaveBeenCalled()
    })

    it('Should return 200 response on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok({ ...fakeService, apiKey: '_tpFy9g3Gai48G' }))
    })

    it('Should return 409 response if receive an unregistered api key', async () => {
      mockRegenerateKey.regenerate.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredApiKeyError('')))
    })

    it('Should return 401 if receive request fom an unauthorized maintainer', async () => {
      mockRegenerateKey.regenerate.mockResolvedValueOnce(new UnauthorizedMaintainerError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized(new UnauthorizedMaintainerError('')))
    })

    it('Should return a 500 response if regenerateApiKey throws', async () => {
      mockRegenerateKey.regenerate.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

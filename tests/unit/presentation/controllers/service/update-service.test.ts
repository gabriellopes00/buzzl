import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import {
  UpdateServiceController,
  UpdateServiceParams
} from '@/presentation/controllers/service/update-service'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { fakeService } from '@t/mocks/service/service'
import { MockUpdateService } from '@t/mocks/service/usecases'
import { fakeUser } from '@t/mocks/user/user'
import { MockValidator } from '@t/mocks/common/validator'

describe('Update Service Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockUpdateService = new MockUpdateService() as jest.Mocked<MockUpdateService>
  const sut = new UpdateServiceController(mockValidator, mockUpdateService)

  const fakeParams: UpdateServiceParams = {
    apiKey: fakeService.apiKey,
    userId: fakeUser.id,
    data: { name: 'New Name', description: 'New Description', isActive: false }
  }

  describe('Validation', () => {
    it('Should call validator before call updateService usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const update = jest.spyOn(mockUpdateService, 'update')
      await sut.handle(fakeParams)

      expect(validate).toHaveBeenCalledWith(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const updateCall = update.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(updateCall)
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

  describe('UpdateService Usecase', () => {
    it('Should not call updateService usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const update = jest.spyOn(mockUpdateService, 'update')
      await sut.handle(fakeParams)
      expect(update).not.toHaveBeenCalled()
    })

    it('Should return 200 response on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok(fakeService))
    })

    it('Should return 409 response if receive an unregistered api key', async () => {
      mockUpdateService.update.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredApiKeyError('')))
    })

    it('Should return 401 if receive request fom an unauthorized maintainer', async () => {
      mockUpdateService.update.mockResolvedValueOnce(new UnauthorizedMaintainerError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized(new UnauthorizedMaintainerError('')))
    })

    it('Should return a 500 response if updateService throws', async () => {
      mockUpdateService.update.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import {
  TransferServiceController,
  TransferServiceParams
} from '@/presentation/controllers/service/transfer-service'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { MockTransferService } from '../../../mocks/transfer-service'
import { fakeService } from '../../../mocks/service'
import { fakeUser } from '../../../mocks/user'
import { MockValidator } from '../../../mocks/validator'

describe('Transfer Service Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockTransferMaintainer = new MockTransferService() as jest.Mocked<MockTransferService>
  const sut = new TransferServiceController(mockValidator, mockTransferMaintainer)

  const fakeParams: TransferServiceParams = {
    apiKey: fakeService.apiKey,
    userId: fakeUser.id,
    newMaintainerEmail: 'new@maintainer.com'
  }

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
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

    it('Should call validator before call updateService usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const update = jest.spyOn(mockTransferMaintainer, 'transfer')
      await sut.handle(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const addCall = update.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(addCall)
    })
  })

  describe('TransferServiceMaintainer Usecase', () => {
    it('Should not call transferMaintainer usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const transfer = jest.spyOn(mockTransferMaintainer, 'transfer')
      await sut.handle(fakeParams)
      expect(transfer).not.toHaveBeenCalled()
    })

    it('Should return 200 response on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(
        ok({ ...fakeService, maintainer: '12ec4cef-c474-450e-b719-b649fa12dc46' })
      )
    })

    it('Should return 409 response if receive an unregistered api key', async () => {
      mockTransferMaintainer.transfer.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredApiKeyError('')))
    })

    it('Should return 409 response if receive an unregistered email', async () => {
      mockTransferMaintainer.transfer.mockResolvedValueOnce(new UnregisteredEmailError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredEmailError('')))
    })

    it('Should return 401 if receive request fom an unauthorized maintainer', async () => {
      mockTransferMaintainer.transfer.mockResolvedValueOnce(new UnauthorizedMaintainerError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized(new UnauthorizedMaintainerError('')))
    })

    it('Should return a 500 response if addService throws', async () => {
      mockTransferMaintainer.transfer.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

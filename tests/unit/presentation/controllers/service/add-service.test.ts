import { AddServiceController } from '@/presentation/controllers/service/add-service'
import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { MockAddService } from '@t/mocks/service/add-service'
import { fakeService, fakeServiceParams } from '@t/mocks/service/service'
import { MockValidator } from '@t/mocks/common/validator'

describe('Add Service Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockAddService = new MockAddService() as jest.Mocked<MockAddService>
  const sut = new AddServiceController(mockValidator, mockAddService)

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeServiceParams)
      expect(validate).toHaveBeenCalledWith(fakeServiceParams)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeServiceParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return an 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeServiceParams)
      expect(response).toEqual(serverError(new Error()))
    })

    it('Should call validator before call addService usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const add = jest.spyOn(mockAddService, 'add')
      await sut.handle(fakeServiceParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(addCall)
    })
  })

  describe('AddService Usecase', () => {
    it('Should not call addService usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const add = jest.spyOn(mockAddService, 'add')
      await sut.handle(fakeServiceParams)
      expect(add).not.toHaveBeenCalled()
    })

    it('Should return 201 response on success', async () => {
      const response = await sut.handle(fakeServiceParams)
      expect(response).toEqual(created(fakeService))
    })

    it('Should return a 500 response if addService throws', async () => {
      mockAddService.add.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeServiceParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

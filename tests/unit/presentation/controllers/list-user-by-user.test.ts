import {
  ListServiceByUserController,
  ListServiceParams
} from '@/presentation/controllers/service/list-service-by-user'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http'
import { MockListServiceByUser } from '../../../mocks/list-service-by-user'
import { fakeUser } from '../../../mocks/user'
import { fakeService } from '../../../mocks/service'
import { MockValidator } from '../../../mocks/validator'

describe('List Service By User Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockListService = new MockListServiceByUser() as jest.Mocked<MockListServiceByUser>
  const sut = new ListServiceByUserController(mockValidator, mockListService)

  const fakeParams: ListServiceParams = { userId: fakeUser.id }

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

    it('Should call validator before call lisServiceByUser usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const list = jest.spyOn(mockListService, 'list')
      await sut.handle(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const listCall = list.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(listCall)
    })
  })

  describe('ListServiceByUser Usecase', () => {
    it('Should not call addService usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const list = jest.spyOn(mockListService, 'list')
      await sut.handle(fakeParams)
      expect(list).not.toHaveBeenCalled()
    })

    it('Should return 200 response on success with found services', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok([fakeService]))
    })

    it('Should return 204 response on success with no services', async () => {
      mockListService.list.mockResolvedValueOnce(null)
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return a 500 response if addService throws', async () => {
      mockListService.list.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

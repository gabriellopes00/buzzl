import { ListServiceByUserController } from '@/presentation/controllers/service/list-service-by-user'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { MockListServiceByUser } from '@t/mocks/service/list-service-by-user'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'

describe('List Service By User Controller', () => {
  const mockListService = new MockListServiceByUser() as jest.Mocked<MockListServiceByUser>
  const sut = new ListServiceByUserController(mockListService)

  describe('ListServiceByUser Usecase', () => {
    it('Should return 200 response on success with found services', async () => {
      const response = await sut.handle({ userId: fakeUser.id })
      expect(response).toEqual(ok([fakeService]))
    })

    it('Should return 204 response on success with no services', async () => {
      jest.spyOn(mockListService, 'list').mockResolvedValueOnce(null)
      const response = await sut.handle({ userId: fakeUser.id })
      expect(response).toEqual(noContent())
    })

    it('Should return a 500 response if addService throws', async () => {
      jest.spyOn(mockListService, 'list').mockRejectedValueOnce(new Error())
      const response = await sut.handle({ userId: fakeUser.id })
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

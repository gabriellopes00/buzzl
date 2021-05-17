import {
  ListServiceByUserController,
  ListServiceParams
} from '@/presentation/controllers/service/list-service-by-user'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { MockListServiceByUser } from '../../../mocks/list-service-by-user'
import { fakeService } from '../../../mocks/service'
import { fakeUser } from '../../../mocks/user'

describe('List Service By User Controller', () => {
  const mockListService = new MockListServiceByUser() as jest.Mocked<MockListServiceByUser>
  const sut = new ListServiceByUserController(mockListService)

  const fakeParams: ListServiceParams = { userId: fakeUser.id }

  describe('ListServiceByUser Usecase', () => {
    it('Should return 200 response on success with found services', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok([fakeService]))
    })

    it('Should return 204 response on success with no services', async () => {
      jest.spyOn(mockListService, 'list').mockResolvedValueOnce(null)
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return a 500 response if addService throws', async () => {
      jest.spyOn(mockListService, 'list').mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})

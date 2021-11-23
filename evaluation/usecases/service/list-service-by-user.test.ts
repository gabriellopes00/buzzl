import { DbListServiceByUser } from '@/usecases/service/list-service-by-user'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/repository'
import { fakeUser } from '@t/mocks/user/user'

describe('List Service By User Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbListServiceByUser(mockServiceRepository)

  describe('Service Repository', () => {
    it('Should call service repository findAll method with correct values', async () => {
      const findAll = jest.spyOn(mockServiceRepository, 'findAll')
      await sut.list(fakeUser.id)
      expect(findAll).toHaveBeenCalledWith({ maintainer: fakeUser.id })
    })

    it('Should return the services list on success', async () => {
      const result = await sut.list(fakeUser.id)
      expect(result).toEqual([fakeService])
    })

    it('Should throws if repository findAll method throws', async () => {
      mockServiceRepository.findAll.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeUser.id)
      await expect(error).rejects.toThrow()
    })
  })
})

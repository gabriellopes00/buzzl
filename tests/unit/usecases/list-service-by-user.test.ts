import { DbListServiceByUser } from '@/usecases/service/list-service-by-user'
import { fakeUser } from '../../mocks/user'
import { MockUserRepository } from '../../mocks/user-repository'
import { fakeService } from '../../mocks/service'
import { MockServiceRepository } from '../../mocks/service-repository'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'

describe('List Service By User Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbListServiceByUser(mockUserRepository, mockServiceRepository)

  describe('User Repository', () => {
    it('Should call user repository once before call service repository', async () => {
      const findUser = jest.spyOn(mockUserRepository, 'findOne')
      const findService = jest.spyOn(mockServiceRepository, 'findAll')
      await sut.list(fakeUser.email)

      // ensure find user by email before find services from this user
      const findUserCall = findUser.mock.invocationCallOrder[0]
      const findServiceCall = findService.mock.invocationCallOrder[0]
      expect(findUserCall).toBeLessThan(findServiceCall)
    })

    it('Should call user repository findOne method with correct values', async () => {
      const findOne = jest.spyOn(mockUserRepository, 'findOne')
      await sut.list(fakeUser.email)
      expect(findOne).toHaveBeenCalledWith({ email: fakeUser.email })
    })

    it('Should return a user on success', async () => {
      const result = await sut.list(fakeUser.email)
      expect(result).toEqual([fakeService])
    })

    it('Should return an UnregisteredEmailError if does not found a user with received email', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null)
      const error = await sut.list(fakeUser.email)
      expect(error).toBeInstanceOf(UnregisteredEmailError)
    })

    it('Should throws if repository add method throws', async () => {
      mockUserRepository.findOne.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeUser.email)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Service Repository', () => {
    it('Should not call service repository if no users are found with received email', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null)
      const findAll = jest.spyOn(mockServiceRepository, 'findAll')
      await sut.list(fakeUser.email)
      expect(findAll).not.toHaveBeenCalled()
    })

    it('Should call service repository findAll method with correct values', async () => {
      const findAll = jest.spyOn(mockServiceRepository, 'findAll')
      await sut.list(fakeUser.email)
      expect(findAll).toHaveBeenCalledWith({ maintainer: fakeUser.id })
    })

    it('Should return the services list on success', async () => {
      const result = await sut.list(fakeUser.email)
      expect(result).toEqual([fakeService])
    })

    it('Should throws if repository findAll method throws', async () => {
      mockServiceRepository.findAll.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeUser.email)
      await expect(error).rejects.toThrow()
    })
  })
})

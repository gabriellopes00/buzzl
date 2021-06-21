import { InvalidServiceTransferError } from '@/domain/service/errors/invalid-transfer'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { User } from '@/domain/user/user'
import { DbTransferService } from '@/usecases/service/transfer-service'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/repository'
import { fakeUser } from '@t/mocks/user/user'
import { MockUserRepository } from '@t/mocks/user/repository'

describe('Transfer Service Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbTransferService(mockUserRepository, mockServiceRepository)

  const newMaintainer = { id: '12ec4cef-c474-450e-b719-b649fa12dc46', email: 'new@maintainer.com' }

  describe('User Repository', () => {
    it('Should call user repository findOne method before call service repository with correct value', async () => {
      const findOneUser = jest.spyOn(mockUserRepository, 'findOne')
      const findOneService = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
      await sut.transfer(fakeService.apiKey, fakeService.maintainer, newMaintainer.email)
      expect(findOneUser).toHaveBeenCalledWith({ email: newMaintainer.email })

      const findOneUserCall = findOneUser.mock.invocationCallOrder[0]
      const findOneServiceCall = findOneService.mock.invocationCallOrder[0]
      expect(findOneUserCall).toBeLessThan(findOneServiceCall)
    })

    it('Should return an UnregisteredEmailError if does not found any user with received email', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null)
      const error = await sut.transfer(
        fakeService.apiKey,
        fakeService.maintainer,
        newMaintainer.email
      )
      expect(error).toBeInstanceOf(UnregisteredEmailError)
    })

    it('Should throws if user repository findOne method throws', async () => {
      mockUserRepository.findOne.mockRejectedValueOnce(new Error())
      const error = sut.transfer(fakeService.apiKey, fakeService.maintainer, newMaintainer.email)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Service Repository', () => {
    describe('Find One Join Maintainer', () => {
      it('Should not call service repository if user repository does not found a user', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(null)
        const findOne = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
        await sut.transfer(fakeService.apiKey, fakeService.maintainer, newMaintainer.email)
        expect(findOne).not.toHaveBeenCalled()
      })

      it('Should call service repository findOneJoinMaintainer method with correct value', async () => {
        const findOne = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
        await sut.transfer(fakeService.apiKey, fakeService.maintainer, newMaintainer.email)
        expect(findOne).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })
      })

      it('Should return an UnregisteredApiKeyError if does not found any service with received apiKey', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockResolvedValueOnce(null)
        const error = await sut.transfer(
          fakeService.apiKey,
          fakeService.maintainer,
          newMaintainer.email
        )
        expect(error).toBeInstanceOf(UnregisteredApiKeyError)
      })

      it('Should return an UnauthorizedMaintainerError if received maintainer is is not the same of the service', async () => {
        const error = await sut.transfer(fakeService.apiKey, 'unauthorized', newMaintainer.email)
        expect(error).toBeInstanceOf(UnauthorizedMaintainerError)
      })

      it('Should return an InvalidServiceTransfer if new maintainer is the current', async () => {
        const error = await sut.transfer(fakeService.apiKey, fakeUser.id, newMaintainer.email)
        expect(error).toBeInstanceOf(InvalidServiceTransferError)
      })

      it('Should throws if repository findOneJoinMaintainer method throws', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockRejectedValueOnce(new Error())
        const error = sut.transfer(fakeService.apiKey, fakeService.maintainer, newMaintainer.email)
        await expect(error).rejects.toThrow()
      })
    })

    describe('Update Service', () => {
      it('Should not call service repository update method if service maintainer is not the same of the service', async () => {
        const update = jest.spyOn(mockServiceRepository, 'update')
        await sut.transfer(fakeService.apiKey, 'unauthorized', newMaintainer.email)
        expect(update).not.toHaveBeenCalled()
      })

      it('Should call service repository update method with correct values', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(newMaintainer as User)
        const update = jest.spyOn(mockServiceRepository, 'update')
        await sut.transfer(fakeService.apiKey, fakeService.maintainer, newMaintainer.email)
        expect(update).toHaveBeenCalledWith({ ...fakeService, maintainer: newMaintainer.id })
      })

      it('Should return updated service on success', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(newMaintainer as User)
        mockServiceRepository.update.mockResolvedValueOnce({
          ...fakeService,
          maintainer: newMaintainer.id
        })
        const result = await sut.transfer(
          fakeService.apiKey,
          fakeService.maintainer,
          newMaintainer.email
        )
        expect(result).toEqual({ ...fakeService, maintainer: newMaintainer.id })
      })

      it('Should throws if repository update method throws', async () => {
        mockServiceRepository.update.mockRejectedValueOnce(new Error())
        mockUserRepository.findOne.mockResolvedValueOnce({ ...newMaintainer } as User)
        const error = sut.transfer(fakeService.apiKey, fakeUser.id, newMaintainer.email)
        await expect(error).rejects.toThrow()
      })
    })
  })
})

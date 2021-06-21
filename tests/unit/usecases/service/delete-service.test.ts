import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbDeleteService } from '@/usecases/service/delete-service'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'
import { MockServiceRepository } from '@t/mocks/service/repository'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'

describe('Delete Service Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbDeleteService(mockServiceRepository)
  const fakeParams = { apiKey: fakeService.apiKey, userId: fakeUser.id }

  describe('Service Repository', () => {
    describe('Find for a service with its respective maintainer data', () => {
      it('Should call service repository find method with correct value', async () => {
        const exists = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
        await sut.delete(fakeParams)
        expect(exists).toHaveBeenCalledWith({ apiKey: fakeParams.apiKey })
      })

      it('Should return an UnregisteredApiKeyError if no services are found', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockResolvedValueOnce(null)
        const error = await sut.delete(fakeParams)
        expect(error).toBeInstanceOf(UnregisteredApiKeyError)
      })

      it('Should return an UnauthorizedMaintainerError if received user id is different of service maintainer', async () => {
        const error = await sut.delete({ ...fakeParams, userId: 'invalid_user_id' })
        expect(error).toBeInstanceOf(UnauthorizedMaintainerError)
      })

      it('Should throw if service repository exists method throws', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockRejectedValueOnce(new Error())
        const error = sut.delete(fakeParams)
        await expect(error).rejects.toThrow()
      })
    })

    describe('Delete Service', () => {
      it('Should call service repository delete method with correct values', async () => {
        const del = jest.spyOn(mockServiceRepository, 'delete')
        await sut.delete(fakeParams)
        expect(del).toHaveBeenCalledWith({ apiKey: fakeParams.apiKey })
      })

      it('Should return void on success', async () => {
        const result = await sut.delete(fakeParams)
        expect(result).toBeUndefined() // void return
      })

      it('Should throws if repository add method throws', async () => {
        mockServiceRepository.delete.mockRejectedValueOnce(new Error())
        const error = sut.delete(fakeParams)
        await expect(error).rejects.toThrow()
      })
    })
  })
})

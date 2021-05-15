import { Service } from '@/domain/service/service'
import { DbUpdateService } from '@/usecases/service/update-service'
import { fakeService } from '../../mocks/service'
import { fakeUser } from '../../mocks/user'
import { MockServiceRepository } from '../../mocks/service-repository'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'

describe('Update Service Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbUpdateService(mockServiceRepository)

  const newData: Partial<Omit<Service, 'id' | 'apiKey' | 'maintainer'>> = {
    name: 'New Service',
    description: 'New Service Updated',
    isActive: false
  }
  const fakeData: Service = { ...fakeService, ...newData }

  describe('Service Repository', () => {
    describe('Find Service', () => {
      it('Should call find service with maintainer data with correct values', async () => {
        const find = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
        await sut.update(fakeService.apiKey, fakeUser.id, fakeData)
        expect(find).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })
      })

      it('Should return an UnregisteredAPiKey error if no service is found', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockResolvedValueOnce(null)
        const error = await sut.update(fakeService.apiKey, fakeUser.id, fakeData)
        expect(error).toBeInstanceOf(UnregisteredApiKeyError)
      })

      it('Should return an UnauthorizedMaintainerError if received user id is different of service maintainer', async () => {
        const error = await sut.update(fakeService.apiKey, 'invalid_maintainer_id', fakeData)
        expect(error).toBeInstanceOf(UnauthorizedMaintainerError)
      })

      it('Should throw if service repository throws', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockRejectedValueOnce(new Error())
        const error = sut.update(fakeService.apiKey, fakeUser.id, fakeData)
        await expect(error).rejects.toThrow()
      })
    })

    describe('Update Service', () => {
      it('Should call find for a service before update one', async () => {
        const find = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
        const update = jest.spyOn(mockServiceRepository, 'update')
        await sut.update(fakeService.apiKey, fakeUser.id, fakeData)

        const findCall = find.mock.invocationCallOrder[0]
        const updateCall = update.mock.invocationCallOrder[0]
        expect(findCall).toBeLessThan(updateCall)
      })

      it('Should call service repository update method with correct values', async () => {
        const update = jest.spyOn(mockServiceRepository, 'update')
        await sut.update(fakeService.apiKey, fakeUser.id, fakeData)
        expect(update).toHaveBeenCalledWith(fakeData)
      })

      it('Should return updated service on success', async () => {
        const result = await sut.update(fakeService.apiKey, fakeUser.id, fakeData)
        expect(result).toEqual(fakeService)
      })

      it('Should throws if repository update method throws', async () => {
        mockServiceRepository.update.mockRejectedValueOnce(new Error())
        const error = sut.update(fakeService.apiKey, fakeUser.id, fakeData)
        await expect(error).rejects.toThrow()
      })
    })
  })
})

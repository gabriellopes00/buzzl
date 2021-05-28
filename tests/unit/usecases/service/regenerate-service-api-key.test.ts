import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbRegenerateServiceApiKey } from '@/usecases/service/regenerate-service-api-key'
import { MockAPIKeyGenerator } from '@t/mocks/common/api-key-generator'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/service-repository'
import { fakeUser } from '@t/mocks/user/user'

describe('Regenerate Service Api Key', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockApiKeyGenerator = new MockAPIKeyGenerator() as jest.Mocked<MockAPIKeyGenerator>
  const sut = new DbRegenerateServiceApiKey(mockServiceRepository, mockApiKeyGenerator)

  const newKey = '_tpFy9g3Gai48G'
  jest.spyOn(mockApiKeyGenerator, 'generate').mockReturnValue(newKey)

  describe('Service Repository', () => {
    describe('Find Service', () => {
      it('Should call find service with maintainer data with correct values', async () => {
        const find = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')
        await sut.regenerate(fakeService.apiKey, fakeUser.id)
        expect(find).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })

        const update = jest.spyOn(mockServiceRepository, 'update')
        await sut.regenerate(fakeService.apiKey, fakeUser.id)

        const findCall = find.mock.invocationCallOrder[0]
        const updateCall = update.mock.invocationCallOrder[0]
        expect(findCall).toBeLessThan(updateCall)
      })

      it('Should return an UnregisteredAPiKey error if no service is found', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockResolvedValueOnce(null)
        const error = await sut.regenerate(fakeService.apiKey, fakeUser.id)
        expect(error).toBeInstanceOf(UnregisteredApiKeyError)
      })

      it('Should return an UnauthorizedMaintainerError if received user id is different of service maintainer', async () => {
        const error = await sut.regenerate(fakeService.apiKey, 'unauthorized')
        expect(error).toBeInstanceOf(UnauthorizedMaintainerError)
      })

      it('Should throw if service repository throws', async () => {
        mockServiceRepository.findOneJoinMaintainer.mockRejectedValueOnce(new Error())
        const error = sut.regenerate(fakeService.apiKey, fakeUser.id)
        await expect(error).rejects.toThrow()
      })
    })

    describe('Update Service', () => {
      it('Should call service repository update method with correct values', async () => {
        const update = jest.spyOn(mockServiceRepository, 'update')
        await sut.regenerate(fakeService.apiKey, fakeUser.id)
        expect(update).toHaveBeenCalledWith({ ...fakeService, apiKey: newKey })
      })

      it('Should return service with regenerated key', async () => {
        mockServiceRepository.update.mockResolvedValueOnce({ ...fakeService, apiKey: newKey })
        const result = await sut.regenerate(fakeService.apiKey, fakeUser.id)
        expect(result).toEqual({ ...fakeService, apiKey: newKey })
      })

      it('Should throws if repository update method throws', async () => {
        mockServiceRepository.update.mockRejectedValueOnce(new Error())
        const error = sut.regenerate(fakeService.apiKey, fakeUser.id)
        await expect(error).rejects.toThrow()
      })
    })
  })

  describe('Api Key Generator', () => {
    it('Should call apiKey generator once after find for a service', async () => {
      const generate = jest.spyOn(mockApiKeyGenerator, 'generate')
      const find = jest.spyOn(mockServiceRepository, 'findOneJoinMaintainer')

      await sut.regenerate(fakeService.apiKey, fakeUser.id)
      expect(generate).toHaveBeenCalled()

      const findCall = find.mock.invocationCallOrder[0]
      const generateCall = generate.mock.invocationCallOrder[0]
      expect(findCall).toBeLessThan(generateCall)
    })

    it('Should throw if api key generator throws', async () => {
      mockApiKeyGenerator.generate.mockImplementationOnce(() => {
        throw new Error()
      })
      const error = sut.regenerate(fakeService.apiKey, fakeUser.id)
      await expect(error).rejects.toThrow()
    })
  })
})

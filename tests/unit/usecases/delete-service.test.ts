import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbDeleteService } from '@/usecases/service/delete-service'
import { fakeService } from '../../mocks/service'
import { MockServiceRepository } from '../../mocks/service-repository'

describe('Delete Service Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const sut = new DbDeleteService(mockServiceRepository)
  const fakeApiKey = fakeService.apiKey

  describe('Service Repository', () => {
    describe('Find existing service', () => {
      it('Should call service repository exists method with correct value', async () => {
        const exists = jest.spyOn(mockServiceRepository, 'exists')
        await sut.delete(fakeApiKey)
        expect(exists).toHaveBeenCalledWith({ apiKey: fakeApiKey })
      })

      it('Should return an UnregisteredApiKeyError if no services are found', async () => {
        mockServiceRepository.exists.mockResolvedValueOnce(false)
        const error = await sut.delete(fakeApiKey)
        expect(error).toBeInstanceOf(UnregisteredApiKeyError)
      })

      it('Should throw if service repository exists method throws', async () => {
        mockServiceRepository.exists.mockRejectedValueOnce(new Error())
        const error = sut.delete(fakeApiKey)
        await expect(error).rejects.toThrow()
      })
    })

    describe('Delete Service', () => {
      it('Should call service repository delete method with correct values', async () => {
        const del = jest.spyOn(mockServiceRepository, 'delete')
        await sut.delete(fakeApiKey)
        expect(del).toHaveBeenCalledWith({ apiKey: fakeApiKey })
      })

      it('Should return void on success', async () => {
        const result = await sut.delete(fakeApiKey)
        expect(result).toBeUndefined() // void return
      })

      it('Should throws if repository add method throws', async () => {
        mockServiceRepository.delete.mockRejectedValueOnce(new Error())
        const error = sut.delete(fakeApiKey)
        await expect(error).rejects.toThrow()
      })
    })
  })
})

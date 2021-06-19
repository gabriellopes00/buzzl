import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbListEvaluationByService } from '@/usecases/evaluation/list-evaluation-by-service'
import { fakeEvaluation } from '@t/mocks/evaluation/evaluation'
import { MockEvaluationRepository } from '@t/mocks/evaluation/evaluation-repository'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/service-repository'

describe('List Evaluation Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockEvaluationRepository =
    new MockEvaluationRepository() as jest.Mocked<MockEvaluationRepository>
  const sut = new DbListEvaluationByService(mockServiceRepository, mockEvaluationRepository)

  describe('Service Repository', () => {
    it('Should call service repository exists method with correct value', async () => {
      const exists = jest.spyOn(mockServiceRepository, 'exists')
      await sut.list(fakeService.apiKey)
      expect(exists).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })
    })

    it('Should return an UnregisteredApiKeyError if does not found a service with service key', async () => {
      mockServiceRepository.exists.mockResolvedValueOnce(null)
      const result = await sut.list(fakeService.apiKey)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.exists.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeService.apiKey)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Evaluation Repository', () => {
    it('Should call evaluation repository list with correct values', async () => {
      const list = jest.spyOn(mockEvaluationRepository, 'findAll')
      await sut.list(fakeService.apiKey)
      expect(list).toHaveBeenCalledWith(fakeService.apiKey)
    })

    it('Should return all evaluations by service on success', async () => {
      const result = await sut.list(fakeService.apiKey)
      expect(result).toEqual([fakeEvaluation])
    })

    it('Should throw if evaluation repository throws', async () => {
      mockEvaluationRepository.findAll.mockRejectedValueOnce(new Error())
      const error = sut.list(fakeService.apiKey)
      await expect(error).rejects.toThrow()
    })
  })
})

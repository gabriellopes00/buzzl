import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbListEvaluationByService } from '@/usecases/evaluation/list-evaluation-by-service'
import { fakeEvaluation } from '@t/mocks/evaluation/evaluation'
import { MockEvaluationRepository } from '@t/mocks/evaluation/repository'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/repository'
import { fakeUser } from '@t/mocks/user/user'

describe('List Evaluation Usecase', () => {
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockEvaluationRepository =
    new MockEvaluationRepository() as jest.Mocked<MockEvaluationRepository>
  const sut = new DbListEvaluationByService(mockServiceRepository, mockEvaluationRepository)

  const params = { service: fakeService.apiKey, userId: fakeUser.id }

  describe('Service Repository', () => {
    it('Should call service repository findOne method with correct value', async () => {
      const findOne = jest.spyOn(mockServiceRepository, 'findOne')
      await sut.list(params)
      expect(findOne).toHaveBeenCalledWith({ apiKey: fakeService.apiKey })
    })

    it('Should return an UnregisteredApiKeyError if does not found a service with service key', async () => {
      mockServiceRepository.findOne.mockResolvedValueOnce(null)
      const result = await sut.list(params)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should return an UnauthorizedMaintainerError if service maintainer is different of received userId', async () => {
      mockServiceRepository.findOne.mockResolvedValueOnce({ ...fakeService, maintainer: '_id' })
      const result = await sut.list(params)
      expect(result).toBeInstanceOf(UnauthorizedMaintainerError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.findOne.mockRejectedValueOnce(new Error())
      const error = sut.list(params)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Evaluation Repository', () => {
    it('Should call evaluation repository list with correct values', async () => {
      const list = jest.spyOn(mockEvaluationRepository, 'findAll')
      await sut.list(params)
      expect(list).toHaveBeenCalledWith(fakeService.apiKey)
    })

    it('Should return all evaluations by service on success', async () => {
      const result = await sut.list(params)
      expect(result).toEqual([fakeEvaluation])
    })

    it('Should return null if there are no evaluations', async () => {
      mockEvaluationRepository.findAll.mockResolvedValueOnce(null)
      const result = await sut.list(params)
      expect(result).toBeNull()
    })

    it('Should throw if evaluation repository throws', async () => {
      mockEvaluationRepository.findAll.mockRejectedValueOnce(new Error())
      const error = sut.list(params)
      await expect(error).rejects.toThrow()
    })
  })
})

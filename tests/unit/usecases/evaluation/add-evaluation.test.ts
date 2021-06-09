import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { DbAddEvaluation } from '@/usecases/evaluation/add-evaluation'
import { MockUUIDGenerator } from '@t/mocks/common/uuid-generator'
import { fakeEvaluationParams } from '@t/mocks/evaluation/evaluation'
import { MockEvaluationRepository } from '@t/mocks/evaluation/evaluation-repository'
import { fakeService } from '@t/mocks/service/service'
import { MockServiceRepository } from '@t/mocks/service/service-repository'

describe('Add Evaluation Usecase', () => {
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const mockServiceRepository = new MockServiceRepository() as jest.Mocked<MockServiceRepository>
  const mockEvaluationRepository =
    new MockEvaluationRepository() as jest.Mocked<MockEvaluationRepository>
  const sut = new DbAddEvaluation(
    mockServiceRepository,
    mockUUIDGenerator,
    mockEvaluationRepository
  )

  describe('Service Repository', () => {
    it('Should call service repository findOne method with correct value', async () => {
      const findOne = jest.spyOn(mockServiceRepository, 'findOne')
      await sut.add(fakeEvaluationParams)
      expect(findOne).toHaveBeenCalledWith({ apiKey: fakeEvaluationParams.service })
    })

    it('Should return an UnregisteredApiKeyError if receive an unregistered api key', async () => {
      mockServiceRepository.findOne.mockResolvedValueOnce(null)
      const result = await sut.add(fakeEvaluationParams)
      expect(result).toBeInstanceOf(UnregisteredApiKeyError)
    })

    it('Should return an InactiveServiceError if feedback service is not active', async () => {
      mockServiceRepository.findOne.mockResolvedValueOnce({ ...fakeService, isActive: false })
      const result = await sut.add(fakeEvaluationParams)
      expect(result).toBeInstanceOf(InactiveServiceError)
    })

    it('Should throw if service repository throws', async () => {
      mockServiceRepository.findOne.mockRejectedValueOnce(new Error())
      const error = sut.add(fakeEvaluationParams)
      await expect(error).rejects.toThrow()
    })
  })

  describe('UUID Generator', () => {
    it('Should call uuid generator once with correct value before call feedback repository', async () => {
      const generate = jest.spyOn(mockUUIDGenerator, 'generate')
      const add = jest.spyOn(mockEvaluationRepository, 'add')
      await sut.add(fakeEvaluationParams)

      // ensure UUID be generated before call feedback repository
      const generateUUIDCall = generate.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(generateUUIDCall).toBeLessThan(addCall)
    })

    it('Should throw if uuid generator throws', async () => {
      mockUUIDGenerator.generate.mockImplementationOnce(() => {
        throw new Error()
      })
      const error = sut.add(fakeEvaluationParams)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Evaluation Repository', () => {
    it('Should call feedback repository add with correct values', async () => {
      const add = jest.spyOn(mockEvaluationRepository, 'add')
      await sut.add(fakeEvaluationParams)
      expect(add).toHaveBeenCalledWith({
        ...fakeEvaluationParams,
        id: mockUUIDGenerator.generate()
      })
    })

    it('Should throw if feedback repository throws', async () => {
      mockEvaluationRepository.add.mockRejectedValueOnce(new Error())
      const error = sut.add(fakeEvaluationParams)
      await expect(error).rejects.toThrow()
    })
  })
})

import { CreateFeedback, CreateFeedbackParams } from '@/modules/feedbacks/usecases/create-feedback'
import { NonExistentServiceIdError } from '@/modules/feedbacks/usecases/errors/nonexistent-service-id'
import { InMemoryFeedbackRepository } from '@t/mocks/infra/repositories/in-memory-feedback-repository copy'
import { InMemoryServiceRepository } from '@t/mocks/infra/repositories/in-memory-service-repository'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'

describe('Create Feedback Usecase', () => {
  const mockedUUIDGenerator = new MockedUUIDGenerator()
  const inMemoryFeedbackRepository = new InMemoryFeedbackRepository()
  const inMemoryServiceRepository = new InMemoryServiceRepository()
  const sut = new CreateFeedback(
    inMemoryFeedbackRepository,
    inMemoryServiceRepository,
    mockedUUIDGenerator
  )
  const feedback: CreateFeedbackParams = {
    title: 'First Feedback',
    content: 'lorem ipsum',
    category: 'ISSUE',
    serviceId: '07356d9a-5ad8-4584-8e6e-2c6e96fdb3f8'
  }

  beforeEach(() => inMemoryFeedbackRepository.truncate())

  it('Should create a feedback on success', async () => {
    jest.spyOn(inMemoryServiceRepository, 'existsId').mockResolvedValueOnce(true)
    const result = await sut.execute(feedback)
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(expect.objectContaining(feedback))

    expect(inMemoryFeedbackRepository.rows.length).toBe(1)
  })

  it('Should create a feedback even with invalid author credentials', async () => {
    jest.spyOn(inMemoryServiceRepository, 'existsId').mockResolvedValueOnce(true)
    const result = await sut.execute({ ...feedback, author: { email: 'invalid' } })
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(expect.objectContaining({ author: null }))

    expect(inMemoryFeedbackRepository.rows.length).toBe(1)
  })

  it('Should return an error if given service id is not registered', async () => {
    const result = await sut.execute(feedback)
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NonExistentServiceIdError)

    expect(inMemoryFeedbackRepository.rows.length).toBe(0)
  })

  it('Should throw if something throws', async () => {
    jest.spyOn(inMemoryServiceRepository, 'existsId').mockRejectedValueOnce(new Error())
    const error = sut.execute(feedback)
    await expect(error).rejects.toThrow()
  })
})

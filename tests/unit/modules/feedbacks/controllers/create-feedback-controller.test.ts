import { CreateFeedbackController } from '@/modules/feedbacks/controllers/create-feedback-controller'
import { CreateFeedback } from '@/modules/feedbacks/usecases/create-feedback'
import { InMemoryFeedbackRepository } from '@t/mocks/infra/repositories/in-memory-feedback-repository copy'
import { InMemoryServiceRepository } from '@t/mocks/infra/repositories/in-memory-service-repository'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'
import { MockedValidator } from '@t/mocks/infra/validator'

describe('Create Feedback Controller', () => {
  const mockedValidator = new MockedValidator()
  const inMemoryRepository = new InMemoryFeedbackRepository()
  const inMemoryServiceRepository = new InMemoryServiceRepository()
  const mockedUUIDGenerator = new MockedUUIDGenerator()
  const createFeedback = new CreateFeedback(
    inMemoryRepository,
    inMemoryServiceRepository,
    mockedUUIDGenerator
  )
  const sut = new CreateFeedbackController(mockedValidator, createFeedback)
})

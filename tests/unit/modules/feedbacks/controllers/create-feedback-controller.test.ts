import { CreateFeedbackController } from '@/modules/feedbacks/controllers/create-feedback-controller'
import { CreateFeedback } from '@/modules/feedbacks/usecases/create-feedback'
import { InMemoryFeedbackRepository } from '@t/mocks/infra/repositories/in-memory-feedback-repository copy'
import { MockedValidator } from '@t/mocks/infra/validator'

describe('Create Feedback Controller', () => {
  const mockedValidator = new MockedValidator()
  const inMemoryRepository = new InMemoryFeedbackRepository()
  const createFeedback = new CreateFeedback(inMemoryRepository)
  const sut = new CreateFeedbackController()
})

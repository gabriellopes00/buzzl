import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { Feedback } from '@/domain/feedback/feedback'
import { FeedbackRepository } from '@/usecases/ports/feedback-repository'
import { fakeFeedback } from './feedback'

export class MockFeedbackRepository implements FeedbackRepository {
  async add(data: Feedback): Promise<void> {}
  async findAll(criteria?: { service: string }): Promise<Feedback[]> {
    return [fakeFeedback]
  }

  async delete(criteria?: { id: string }): Promise<void | UnregisteredFeedbackError> {}
}

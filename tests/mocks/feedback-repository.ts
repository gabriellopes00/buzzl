import { Feedback } from '@/domain/feedback/feedback'
import { FeedbackRepository } from '@/usecases/ports/feedback-repository'

export class MockFeedbackRepository implements FeedbackRepository {
  async add(data: Feedback): Promise<void> {}
}

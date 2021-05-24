import { Feedback } from '@/domain/feedback/feedback'
import { ListFeedbackByService } from '@/domain/feedback/list-feedback-by-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { fakeFeedback } from './feedback'

export class MockListFeedbackByService implements ListFeedbackByService {
  async list(service: string): Promise<Feedback[] | UnregisteredApiKeyError> {
    return [
      { ...fakeFeedback, category: 'COMMENT' },
      { ...fakeFeedback, category: 'COMMENT' },
      { ...fakeFeedback, category: 'ISSUE' },
      { ...fakeFeedback, category: 'ISSUE' },
      { ...fakeFeedback, category: 'IDEA' },
      { ...fakeFeedback, category: 'IDEA' }
    ]
  }
}

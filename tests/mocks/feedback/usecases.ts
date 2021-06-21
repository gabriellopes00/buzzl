import { AddFeedback, FeedbackParams } from '@/domain/feedback/add-feedback'
import { DeleteFeedback } from '@/domain/feedback/delete-feedback'
import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { Feedback } from '@/domain/feedback/feedback'
import { ListFeedbackByService } from '@/domain/feedback/list-feedback-by-service'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { fakeFeedback } from './feedback'

export class MockDeleteFeedback implements DeleteFeedback {
  async delete(
    id: string,
    apiKey: string,
    userId: string
  ): Promise<
    void | UnregisteredApiKeyError | UnregisteredFeedbackError | UnauthorizedMaintainerError
  > {}
}

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

export class MockAddFeedback implements AddFeedback {
  async add(data: FeedbackParams): Promise<void | UnregisteredApiKeyError> {}
}

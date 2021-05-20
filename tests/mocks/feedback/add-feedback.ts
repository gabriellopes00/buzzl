import { AddFeedback, FeedbackParams } from '@/domain/feedback/add-feedback'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'

export class MockAddFeedback implements AddFeedback {
  async add(data: FeedbackParams): Promise<void | UnregisteredApiKeyError> {}
}

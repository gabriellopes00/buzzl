import { UnauthorizedMaintainerError } from '../service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '../service/errors/unregistered-api-key'
import { UnregisteredFeedbackError } from './errors/unregistered-feedback'
import { Feedback } from './feedback'

export interface FeedbackParams extends Omit<Feedback, 'id'> {}

export interface DeleteFeedback {
  delete(
    id: string,
    apiKey: string,
    userId: string
  ): Promise<
    void | UnregisteredApiKeyError | UnregisteredFeedbackError | UnauthorizedMaintainerError
  >
}

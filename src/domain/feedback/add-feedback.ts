import { UnregisteredApiKeyError } from '../service/errors/unregistered-api-key'
import { Feedback } from './feedback'

export interface FeedbackParams extends Omit<Feedback, 'id'> {}

export interface AddFeedback {
  add(data: FeedbackParams): Promise<void | UnregisteredApiKeyError>
}

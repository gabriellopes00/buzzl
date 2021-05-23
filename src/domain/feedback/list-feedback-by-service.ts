import { UnregisteredApiKeyError } from '../service/errors/unregistered-api-key'
import { Feedback } from './feedback'

export interface ListFeedbackByService {
  list(service: string): Promise<Feedback[] | UnregisteredApiKeyError>
}

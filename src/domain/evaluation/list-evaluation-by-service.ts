import { UnregisteredApiKeyError } from '../service/errors/unregistered-api-key'
import { Evaluation } from './evaluation'

export interface ListEvaluation {
  list(service: string): Promise<Evaluation[] | UnregisteredApiKeyError>
}

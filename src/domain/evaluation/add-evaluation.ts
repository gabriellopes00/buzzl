import { InactiveServiceError } from '../service/errors/inactive-service'
import { UnregisteredApiKeyError } from '../service/errors/unregistered-api-key'
import { Evaluation } from './evaluation'

export interface EvaluationParams extends Omit<Evaluation, 'id'> {}

export interface AddEvaluation {
  add(data: EvaluationParams): Promise<void | UnregisteredApiKeyError | InactiveServiceError>
}

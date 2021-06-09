import { AddEvaluation, EvaluationParams } from '@/domain/evaluation/add-evaluation'
import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'

export class MockAddEvaluation implements AddEvaluation {
  public async add(
    data: EvaluationParams
  ): Promise<void | UnregisteredApiKeyError | InactiveServiceError> {}
}

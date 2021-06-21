import { AddEvaluation, EvaluationParams } from '@/domain/evaluation/add-evaluation'
import { Evaluation } from '@/domain/evaluation/evaluation'
import { ListEvaluation } from '@/domain/evaluation/list-evaluation-by-service'
import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { CalculateNPS, NPSData } from '@/services/nps/calculate-nps'
import { fakeEvaluation } from './evaluation'

export class MockAddEvaluation implements AddEvaluation {
  public async add(
    data: EvaluationParams
  ): Promise<void | UnregisteredApiKeyError | InactiveServiceError> {}
}

export class MockListEvaluation implements ListEvaluation {
  public async list(service: string): Promise<Evaluation[] | UnregisteredApiKeyError> {
    return [fakeEvaluation]
  }
}

export class MockNPSService implements CalculateNPS {
  public async calculate(evaluations: Evaluation[]): Promise<NPSData> {
    return {
      score: 90,
      level: 'EXCELLENT',
      evaluations: 9,
      detractors: { quantity: 3, percent: 33.3 },
      passives: { quantity: 3, percent: 33.3 },
      promoters: { quantity: 3, percent: 33.3 }
    }
  }
}

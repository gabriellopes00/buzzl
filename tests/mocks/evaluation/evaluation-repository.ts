import { Evaluation } from '@/domain/evaluation/evaluation'
import { EvaluationRepository } from '@/usecases/ports/evaluation-repository'

export class MockEvaluationRepository implements EvaluationRepository {
  public async add(data: Evaluation): Promise<void> {}
}

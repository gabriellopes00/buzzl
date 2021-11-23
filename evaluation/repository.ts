import { Evaluation } from '@/domain/evaluation/evaluation'
import { EvaluationRepository } from '@/usecases/ports/evaluation-repository'
import { fakeEvaluation } from './evaluation'

export class MockEvaluationRepository implements EvaluationRepository {
  public async add(data: Evaluation): Promise<void> {}

  public async findAll(service: string): Promise<Evaluation[]> {
    return [fakeEvaluation]
  }
}

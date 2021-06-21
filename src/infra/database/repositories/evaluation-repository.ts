import { Evaluation } from '@/domain/evaluation/evaluation'
import { EvaluationRepository } from '@/usecases/ports/evaluation-repository'
import { getRepository } from 'typeorm'
import { EvaluationModel } from '../models/evaluation'

export class PgEvaluationRepository implements EvaluationRepository {
  public async add(data: Evaluation): Promise<void> {
    const repository = getRepository(EvaluationModel)
    await repository.save(repository.create(data))
  }

  public async findAll(serviceKey: string): Promise<Evaluation[]> {
    const repository = getRepository(EvaluationModel)
    const evaluations = await repository.find({ service: serviceKey })
    return evaluations.length > 0 ? evaluations : null
  }
}

import { Evaluation } from '@/domain/evaluation/evaluation'
import { EvaluationRepository } from '@/usecases/ports/evaluation-repository'
import { getRepository } from 'typeorm'
import { EvaluationModel } from '../models/evaluation'

export class PgEvaluationRepository implements EvaluationRepository {
  public async add(data: Evaluation): Promise<void> {
    const repository = getRepository(EvaluationModel)
    await repository.save(repository.create(data))
  }

  // public async findAll(criteria?: { service: string }): Promise<Evaluation[]> {
  //   const repository = getRepository(FeedbackModel)
  //   let feedbacks: Evaluation[]
  //   if (criteria && criteria.service) {
  //     feedbacks = await repository.find({ service: criteria.service })
  //   } else feedbacks = (await repository.find()) || null

  //   return feedbacks.length > 0 ? feedbacks : null
  // }

  // public async delete(criteria: { id: string }): Promise<void | UnregisteredFeedbackError> {
  //   const repository = getRepository(FeedbackModel)
  //   await repository.delete({ id: criteria.id })
  // }

  // public async findOne(criteria: { id: string }): Promise<Evaluation> {
  //   const repository = getRepository(FeedbackModel)
  //   return (await repository.findOne({ id: criteria.id })) || null
  // }
}

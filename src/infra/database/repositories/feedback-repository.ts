import { Feedback } from '@/domain/feedback/feedback'
import { FeedbackRepository } from '@/usecases/ports/feedback-repository'
import { getRepository } from 'typeorm'
import { FeedbackModel } from '../models/feedback'

export class PgFeedbackRepository implements FeedbackRepository {
  public async add(data: Feedback): Promise<void> {
    const repository = getRepository(FeedbackModel)
    await repository.save(repository.create(data))
  }

  public async findAll(criteria?: { service: string }): Promise<Feedback[]> {
    const repository = getRepository(FeedbackModel)
    if (criteria.service) {
      return await repository.find({ service: criteria.service })
    }
    return await repository.find()
  }
}

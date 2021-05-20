import { Feedback } from '@/domain/feedback/feedback'
import { FeedbackRepository } from '@/usecases/ports/feedback-repository'
import { getRepository } from 'typeorm'
import { FeedbackModel } from '../models/feedback'

export class PgFeedbackRepository implements FeedbackRepository {
  public async add(data: Feedback): Promise<void> {
    const repository = getRepository(FeedbackModel)
    await repository.save(repository.create(data))
  }
}

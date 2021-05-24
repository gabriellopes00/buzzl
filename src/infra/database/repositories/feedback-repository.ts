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
    let feedbacks: Feedback[]
    if (criteria && criteria.service) {
      feedbacks = await repository.find({ service: criteria.service })
    } else feedbacks = (await repository.find()) || null

    return feedbacks.length > 0 ? feedbacks : null
  }
}

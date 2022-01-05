import { Feedback } from '@/modules/feedbacks/domain/entities/feedback'
import { FindFeedbackRepository } from '@/modules/feedbacks/repositories/find-feedback-repository'
import { SaveFeedbackRepository } from '@/modules/feedbacks/repositories/save-feedback'
import { getRepository } from 'typeorm'
import { FeedbackModel } from '../models/feedback'

/**
 * PgAccountRepository is the real implementation for the account's repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
/* eslint-disable */
export class PgFeedbackRepository implements SaveFeedbackRepository, FindFeedbackRepository {
  /* eslint-enable */
  /**
   * Create method is implemented from CreateAccountRepository. It adapt Account credentials to
   * the credentials TypeORM model and store it.
   * @param data Account credentials
   */
  public async save(data: Feedback): Promise<void> {
    // FIX: set null in table if not receive any author data
    // FIX: ignore author creation if receive an existing one
    const repository = getRepository(FeedbackModel)
    const feedback = repository.create(data)
    await repository.save(feedback)
  }

  /**
   * ExistsEmail method is implemented from LoadAccountRepository. It find in the database
   * if exists an account with given email.
   * @param email Search argument
   * @returns {Promise<boolean>} Returns either an account was found with given email or not.
   */
  public async findAll(criteria?: { serviceId: string }): Promise<Feedback[]> {
    const repository = getRepository(FeedbackModel)
    const feedbacks = await repository.find({ where: { serviceId: criteria.serviceId } })
    return feedbacks.length === 0 ? null : feedbacks.map(f => Feedback.adapt(f)) // TODO: this code ignore all author data, once it is optional on entity adapt, fix it
  }

  public async delete(feedbackId: string): Promise<void> {
    const repository = getRepository(FeedbackModel)
    await repository.delete(feedbackId)
  }
}

import { UUIDGenerator } from '@/core/infra/uuid-generator'
import { FindServiceRepository } from '@/modules/services/repositories/find-service-repository'
import { Either, left, right } from '@/shared/either'
import { Feedback, FeedbackData, FeedbackErrors } from '../domain/entities/feedback'
import { SaveFeedbackRepository } from '../repositories/save-feedback'
import { NonExistentServiceIdError } from './errors/nonexistent-service-id'

export interface CreateFeedbackParams extends FeedbackData {}
export interface CreateFeedbackErrors extends FeedbackErrors, NonExistentServiceIdError {}

export class CreateFeedback {
  constructor(
    private readonly repository: SaveFeedbackRepository,
    private readonly serviceRepository: FindServiceRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  public async execute(
    params: CreateFeedbackParams
  ): Promise<Either<CreateFeedbackErrors, Feedback>> {
    const uuid = this.uuidGenerator.generate()
    const feedbackResult = Feedback.create(params, uuid)
    if (feedbackResult.isLeft()) return left(feedbackResult.value)

    const feedback = feedbackResult.value

    const existingService = await this.serviceRepository.existsId(feedback.serviceId)
    if (!existingService) return left(new NonExistentServiceIdError(params.serviceId))

    await this.repository.save(feedback)
    return right(feedback)
  }
}

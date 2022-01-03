import { FindServiceRepository } from '@/modules/services/repositories/find-service-repository'
import { Either, left, right } from '@/shared/either'
import { Feedback } from '../domain/entities/feedback'
import { FindFeedbackRepository } from '../repositories/find-feedback-repository'
import { NonExistentServiceIdError } from './errors/nonexistent-service-id'

export interface ListFeedbackParams {
  serviceId: string
}

export interface ListFeedbackErrors extends NonExistentServiceIdError {}

export class ListFeedback {
  constructor(
    private readonly repository: FindFeedbackRepository,
    private readonly serviceRepository: FindServiceRepository
  ) {}

  public async execute({
    serviceId
  }: ListFeedbackParams): Promise<Either<ListFeedbackErrors, Feedback[]>> {
    const existingService = await this.serviceRepository.existsId(serviceId)
    if (!existingService) return left(new NonExistentServiceIdError(serviceId))

    const feedbacks = await this.repository.findAll({ serviceId })
    return right(feedbacks)
  }
}

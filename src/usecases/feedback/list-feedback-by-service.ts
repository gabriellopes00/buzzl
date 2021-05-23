import { Feedback } from '@/domain/feedback/feedback'
import { ListFeedbackByService } from '@/domain/feedback/list-feedback-by-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { FeedbackRepository } from '../ports/feedback-repository'
import { ServiceRepository } from '../ports/service-repository'

export class DbListFeedbackByService implements ListFeedbackByService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly feedbackRepository: FeedbackRepository
  ) {}

  public async list(service: string): Promise<Feedback[] | UnregisteredApiKeyError> {
    const existingService = await this.serviceRepository.exists({ apiKey: service })
    if (!existingService) return new UnregisteredApiKeyError(service)

    const feedbacks = await this.feedbackRepository.findAll({ service })
    return feedbacks
  }
}

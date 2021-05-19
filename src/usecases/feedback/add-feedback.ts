import { AddFeedback, FeedbackParams } from '@/domain/feedback/add-feedback'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { FeedbackRepository } from '../ports/feedback-repository'
import { ServiceRepository } from '../ports/service-repository'
import { UUIDGenerator } from '../ports/uuid-generator'

export class DbAddFeedback implements AddFeedback {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly uuidGenerator: UUIDGenerator,
    private readonly feedbackRepository: FeedbackRepository
  ) {}

  public async add(data: FeedbackParams): Promise<void | UnregisteredApiKeyError> {
    const existingService = await this.serviceRepository.exists({ apiKey: data.service })
    if (!existingService) return new UnregisteredApiKeyError(data.service)

    const id = this.uuidGenerator.generate()
    await this.feedbackRepository.add({ ...data, id })
  }
}

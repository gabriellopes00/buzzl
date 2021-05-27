import { DeleteFeedback } from '@/domain/feedback/delete-feedback'
import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { FeedbackRepository } from '../ports/feedback-repository'
import { ServiceRepository } from '../ports/service-repository'

export class DbDeleteFeedback implements DeleteFeedback {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly feedbackRepository: FeedbackRepository
  ) {}

  public async delete(
    id: string,
    apiKey: string,
    userId: string
  ): Promise<
    void | UnregisteredApiKeyError | UnregisteredFeedbackError | UnauthorizedMaintainerError
  > {
    const service = await this.serviceRepository.findOneJoinMaintainer({ apiKey })
    if (!service) return new UnregisteredApiKeyError(apiKey)
    else if (service.maintainer.id !== userId) return new UnauthorizedMaintainerError(userId)

    const deletionResult = await this.feedbackRepository.delete({ id })
    if (deletionResult instanceof UnregisteredFeedbackError) {
      return new UnregisteredFeedbackError(id)
    }
  }
}

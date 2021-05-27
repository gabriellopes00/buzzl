import { DeleteFeedback } from '@/domain/feedback/delete-feedback'
import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'

export class MockDeleteFeedback implements DeleteFeedback {
  async delete(
    id: string,
    apiKey: string,
    userId: string
  ): Promise<
    void | UnregisteredApiKeyError | UnregisteredFeedbackError | UnauthorizedMaintainerError
  > {}
}

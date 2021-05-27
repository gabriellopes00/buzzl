import { DeleteFeedback } from '@/domain/feedback/delete-feedback'
import { UnregisteredFeedbackError } from '@/domain/feedback/errors/unregistered-feedback'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import {
  badRequest,
  conflict,
  noContent,
  serverError,
  unauthorized
} from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface DeleteFeedbackParams {
  id: string
  service: string
  userId: string
}

export class DeleteFeedbackController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly deleteFeedback: DeleteFeedback
  ) {}

  public async handle(request: DeleteFeedbackParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const { id, service, userId } = request
      const deletionResult = await this.deleteFeedback.delete(id, service, userId)
      if (deletionResult instanceof UnregisteredApiKeyError) {
        return badRequest(deletionResult)
      } else if (deletionResult instanceof UnauthorizedMaintainerError) {
        return unauthorized(deletionResult)
      } else if (deletionResult instanceof UnregisteredFeedbackError) {
        return conflict(deletionResult)
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

import { AddFeedback, FeedbackParams } from '@/domain/feedback/add-feedback'
import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export class AddFeedbackController implements Controller {
  constructor(private readonly validator: Validator, private readonly addFeedback: AddFeedback) {}

  public async handle(request: FeedbackParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const creationResult = await this.addFeedback.add(request)
      if (creationResult instanceof UnregisteredApiKeyError) return badRequest(creationResult)
      else if (creationResult instanceof InactiveServiceError) return badRequest(creationResult)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

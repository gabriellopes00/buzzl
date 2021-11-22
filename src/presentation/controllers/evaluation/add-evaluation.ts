import { AddEvaluation } from '@/domain/evaluation/add-evaluation'
import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export class AddEvaluationController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly addEvaluation: AddEvaluation
  ) {}

  public async handle(request: { service: string; rating: number }): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const response = await this.addEvaluation.add(request)
      if (response instanceof UnregisteredApiKeyError) return badRequest(response)
      else if (response instanceof InactiveServiceError) return badRequest(response)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

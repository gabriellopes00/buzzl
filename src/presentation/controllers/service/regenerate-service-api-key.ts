import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { RegenerateServiceApiKey } from '@/domain/service/regenerate-service-api-key'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export class RegenerateApiKeyController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly regenerateKey: RegenerateServiceApiKey
  ) {}

  public async handle(request: { apiKey: string; userId: string }): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const updateResult = await this.regenerateKey.regenerate(request.apiKey, request.userId)
      if (updateResult instanceof UnregisteredApiKeyError) return conflict(updateResult)
      else if (updateResult instanceof UnauthorizedMaintainerError) {
        return unauthorized(updateResult)
      }

      return ok(updateResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

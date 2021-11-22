import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { UpdateService } from '@/domain/service/update-service'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface UpdateServiceParams {
  userId: string
  apiKey: string
  data: {
    name?: string
    description?: string
    isActive?: boolean
  }
}

export class UpdateServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly updateService: UpdateService
  ) {}

  public async handle(request: UpdateServiceParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const { apiKey, userId, data } = request
      const updateResult = await this.updateService.update(apiKey, userId, data)
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

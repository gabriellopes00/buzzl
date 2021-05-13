import { DeleteService } from '@/domain/service/delete-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { badRequest, conflict, noContent, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface DeleteServiceParams {
  apiKey: string
}

export class DeleteServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly deleteService: DeleteService
  ) {}

  public async handle(request: DeleteServiceParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const result = await this.deleteService.delete(request.apiKey)
      if (result instanceof UnregisteredApiKeyError) return conflict(result)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

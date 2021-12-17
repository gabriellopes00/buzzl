import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { DeleteService } from '../usecases/delete-service'

export interface DeleteServiceControllerParams {
  id: string
  accountId: string
}

export class DeleteServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly deleteService: DeleteService
  ) {}

  async handle(params: DeleteServiceControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      await this.deleteService.execute(params.id, params.accountId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { ForbiddenError } from '@/presentation/errors/forbidden'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http'
import { FindAccountService } from '@/modules/services/usecases/find-account-service'

export interface FindAccountServiceControllerParams {
  // Id extracted from token
  accountId: string
  // Id from path parameter
  id: string
}

export class FindAccountServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly findService: FindAccountService
  ) {}

  async handle(params: FindAccountServiceControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)
      const { id, accountId } = params

      if (id !== accountId) return forbidden(new ForbiddenError('Forbidden services access'))

      const result = (await this.findService.execute(accountId)).value
      return ok({ services: result.map(s => s.data) })
    } catch (error) {
      return serverError(error)
    }
  }
}

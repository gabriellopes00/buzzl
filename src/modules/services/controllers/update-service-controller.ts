import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http'
import { ForbiddenServiceUpdateError } from '../usecases/errors/forbidden-service-update-error'
import { UpdateService, UpdateServiceParams } from '../usecases/update-service'

export interface UpdateServiceControllerParams extends UpdateServiceParams {
  id: string
  accountId: string
}

export class UpdateServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly updateService: UpdateService
  ) {}

  async handle(params: UpdateServiceControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const { name, description, isActive, id, accountId } = params

      const result = await this.updateService.update(id, accountId, { name, description, isActive })
      if (result.isLeft()) {
        switch (result.value.constructor) {
          case ForbiddenServiceUpdateError:
            return forbidden(result.value as Error)
          default:
            return badRequest(result.value as Error)
        }
      }
      return ok({ services: result })
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { UpdateService, UpdateServiceParams } from '../usecases/update-service'

export interface UpdateServiceControllerParams extends UpdateServiceParams {
  id: string
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

      const { name, description, isActive, id } = params

      const result = (await this.updateService.update(id, { name, description, isActive })).value
      return ok({ services: result })
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { CreateService, CreateServiceParams } from '../domain/usecases/create-service'

export interface CreateServiceControllerParams extends CreateServiceParams {
  accountId: string
  is_active: boolean
}

export class CreateServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly createService: CreateService
  ) {}

  async handle(params: CreateServiceControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)
      const { name, is_active: isActive, description, accountId } = params

      const result = await this.createService.create({ name, isActive, description }, accountId)
      if (result.isLeft()) return badRequest(result.value)

      const { id, maintainerAccountId, createdAt, apiKey } = result.value

      return created({
        service: {
          id,
          name,
          description,
          is_active: isActive,
          api_key: apiKey,
          maintainer_account_id: maintainerAccountId,
          created_at: createdAt
        }
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

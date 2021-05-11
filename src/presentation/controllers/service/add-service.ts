import { AddService } from '@/domain/service/add-service'
import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface AddServiceParams {
  userId: string
  name: string
  description?: string
}

export class AddServiceController implements Controller {
  constructor(private readonly validator: Validator, private readonly addService: AddService) {}

  public async handle(request: AddServiceParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const { name, description } = request
      const service = await this.addService.add({ name, description, maintainer: request.userId })
      return created(service)
    } catch (error) {
      return serverError(error)
    }
  }
}

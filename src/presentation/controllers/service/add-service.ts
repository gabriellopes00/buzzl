import { AddService, ServiceParams } from '@/domain/usecases/service/add-service'
import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export class AddServiceController implements Controller {
  constructor(private readonly validator: Validator, private readonly addService: AddService) {}

  public async handle(request: ServiceParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const service = await this.addService.add(request)
      return created(service)
    } catch (error) {
      return serverError(error)
    }
  }
}

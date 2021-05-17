import { ListServiceByUser } from '@/domain/service/list-service-by-user'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface ListServiceParams {
  userId: string
}

export class ListServiceByUserController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly listServiceByUser: ListServiceByUser
  ) {}

  public async handle(request: ListServiceParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const services = await this.listServiceByUser.list(request.userId)
      if (services === null) return noContent()
      else return ok(services)
    } catch (error) {
      return serverError(error)
    }
  }
}

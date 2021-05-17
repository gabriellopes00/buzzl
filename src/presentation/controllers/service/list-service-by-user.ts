import { ListServiceByUser } from '@/domain/service/list-service-by-user'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'

export interface ListServiceParams {
  userId: string
}

export class ListServiceByUserController implements Controller {
  constructor(private readonly listServiceByUser: ListServiceByUser) {}

  public async handle(request: ListServiceParams): Promise<HttpResponse> {
    try {
      const services = await this.listServiceByUser.list(request.userId)
      if (services === null) return noContent()
      else return ok(services)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Authentication } from '@/domain/usecases/user/authentication'
import { UnauthorizedError } from '../errors/unauthorized'
import { forbidden, ok, serverError } from '../helpers/http'
import { HttpResponse } from '../ports/http'
import { Middleware } from '../ports/middleware'

export interface AuthUserRequest {
  accessToken?: string
}

export class AuthUserMiddleware implements Middleware {
  constructor(private readonly authenticator: Authentication) {}

  public async handle(request: AuthUserRequest): Promise<HttpResponse> {
    try {
      if (!request?.accessToken) {
        return forbidden(new UnauthorizedError('Missing authentication token'))
      }
      const { accessToken } = request
      const { id } = await this.authenticator.auth(accessToken)
      return ok({ userId: id })
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Authentication } from '@/domain/user/authentication'
import { ForbiddenError } from '../errors/forbidden'
import { UnauthorizedError } from '../errors/unauthorized'
import { forbidden, ok, serverError, unauthorized } from '../helpers/http'
import { HttpResponse } from '../ports/http'
import { Middleware } from '../ports/middleware'

export interface AuthUserRequest {
  accessToken: string
}

export class AuthUserMiddleware implements Middleware {
  constructor(private readonly authenticator: Authentication) {}

  public async handle(request: AuthUserRequest): Promise<HttpResponse> {
    try {
      if (!request?.accessToken) {
        return forbidden(new ForbiddenError('Authentication token required'))
      }
      const { accessToken } = request
      const authResult = await this.authenticator.auth(accessToken)
      if (authResult === null) {
        return unauthorized(new UnauthorizedError('Invalid authentication token'))
      }

      return ok({ userId: authResult.id })
    } catch (error) {
      return serverError(error)
    }
  }
}

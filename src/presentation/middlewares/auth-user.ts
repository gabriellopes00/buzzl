import { Authentication } from '@/domain/user/authentication'
import { ForbiddenError } from '../errors/forbidden'
import { forbidden, ok, serverError, unauthorized } from '../helpers/http'
import { HttpResponse } from '../ports/http'
import { Middleware } from '../ports/middleware'

export interface AuthUserRequest {
  headers: {
    accessToken?: string
  }
}

export class AuthUserMiddleware implements Middleware {
  constructor(private readonly authenticator: Authentication) {}

  public async handle(request: AuthUserRequest): Promise<HttpResponse> {
    try {
      if (!request?.headers?.accessToken) {
        return forbidden(new ForbiddenError('Authentication token required'))
      }
      const { accessToken } = request.headers
      const authResult = await this.authenticator.auth(accessToken)
      if (authResult === null) return unauthorized('Invalid authentication token')

      return ok({ userId: authResult.id })
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

import { HttpResponse } from '@/core/presentation/http'
import { Middleware } from '@/core/presentation/middleware'
import { AuthAccount } from '@/modules/accounts/usecases/auth-account'
import { UnauthorizedError } from '../errors/unauthorized'
import { ok, serverError, unauthorized } from '../helpers/http'

export interface AuthAccountMiddlewareParams {
  accessToken: string
}

export class AuthAccountMiddleware implements Middleware {
  constructor(private readonly authAccount: AuthAccount) {}

  public async handle(params: AuthAccountMiddlewareParams): Promise<HttpResponse> {
    try {
      if (!params?.accessToken) {
        return unauthorized(new UnauthorizedError('Access token required'))
      }

      const { accessToken } = params
      const authResult = await this.authAccount.auth(accessToken)
      if (authResult.isLeft()) return unauthorized(authResult.value)

      return ok({ accountId: authResult.value.id })
    } catch (error) {
      return serverError(error)
    }
  }
}

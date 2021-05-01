import { UnmatchedPasswordError } from '@/domain/usecases/errors/user/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/errors/user/unregistered-email'
import { AuthParams, AuthUser } from '@/domain/usecases/user/auth-user'
import { badRequest, ok, serverError, unauthorized } from '../helpers/http'
import { Controller } from '../ports/controllers'
import { HttpResponse } from '../ports/http'
import { Validator } from '../ports/validator'

export interface AuthUserResponse {
  accessToken: string
}

export class AuthUserController implements Controller {
  constructor(private readonly validator: Validator, private readonly authenticator: AuthUser) {}

  async handle(params: AuthParams): Promise<HttpResponse> {
    try {
      const validationError = this.validator.validate(params)
      if (validationError instanceof Error) return badRequest(validationError)

      const authResult = await this.authenticator.auth(params)

      if (authResult instanceof UnregisteredEmailError) return badRequest(authResult)
      else if (authResult instanceof UnmatchedPasswordError) return unauthorized(authResult.message)

      return ok<AuthUserResponse>({ accessToken: authResult })
    } catch (error) {
      return serverError(error)
    }
  }
}

import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { SignInAccount, SignInParams } from '../usecases/sign-in-account'

export interface SignInAccountControllerParams extends SignInParams {}

export class SignInAccountController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly signInAccount: SignInAccount
  ) {}

  async handle(params: SignInAccountControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.signInAccount.signIn(params)
      if (result.isLeft()) return unauthorized(result.value)

      const { accessToken, refreshToken } = result.value
      return ok({ access_token: accessToken, refresh_token: refreshToken })
    } catch (error) {
      return serverError(error)
    }
  }
}

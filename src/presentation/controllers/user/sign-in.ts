import { UnmatchedPasswordError } from '@/domain/usecases/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/user/errors/unregistered-email'
import { SignInParams, SignIn } from '@/domain/usecases/user/sign-in'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http'
import { Controller } from '../../ports/controllers'
import { HttpResponse } from '../../ports/http'
import { Validator } from '../../ports/validator'

export interface SignInResponse {
  accessToken: string
}

export class SignInController implements Controller {
  constructor(private readonly validator: Validator, private readonly signIn: SignIn) {}

  async handle(params: SignInParams): Promise<HttpResponse> {
    try {
      const validationError = this.validator.validate(params)
      if (validationError instanceof Error) return badRequest(validationError)

      const signResult = await this.signIn.sign(params)

      if (signResult instanceof UnregisteredEmailError) return badRequest(signResult)
      else if (signResult instanceof UnmatchedPasswordError) return unauthorized(signResult.message)

      return ok<SignInResponse>({ accessToken: signResult })
    } catch (error) {
      return serverError(error)
    }
  }
}

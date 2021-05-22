import { ChangePassword } from '@/domain/user/change-password'
import { EqualPasswordError } from '@/domain/user/errors/equal-passwords'
import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { badRequest, conflict, noContent, serverError } from '../../helpers/http'
import { Controller } from '../../ports/controllers'
import { HttpResponse } from '../../ports/http'
import { Validator } from '../../ports/validator'

export interface ChangePassParams {
  currentPass: string
  newPass: string
  userId: string
}

export class ChangePassController implements Controller {
  constructor(private readonly validator: Validator, private readonly changePass: ChangePassword) {}

  async handle(params: ChangePassParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.changePass.change(params)
      if (result instanceof UnmatchedPasswordError) return conflict(result)
      else if (result instanceof EqualPasswordError) return conflict(result)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

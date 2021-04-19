import { UserParams } from '@/domain/usecases/user/add-user'
import { badRequest } from '../helpers/http'
import { Controller } from '../ports/controllers'
import { HttpResponse } from '../ports/http'
import { Validator } from '../ports/validator'

export class AddUserController implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(params: UserParams): Promise<HttpResponse> {
    const error = this.validator.validate(params)
    if (error) return badRequest(error)

    return null
  }
}

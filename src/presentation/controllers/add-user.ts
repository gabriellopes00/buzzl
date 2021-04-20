import { AddUser, UserParams } from '@/domain/usecases/user/add-user'
import { badRequest, conflict, ok, serverError } from '../helpers/http'
import { Controller } from '../ports/controllers'
import { HttpResponse } from '../ports/http'
import { Validator } from '../ports/validator'

export class AddUserController implements Controller {
  constructor(private readonly validator: Validator, private readonly addUser: AddUser) {}

  async handle(params: UserParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.addUser.add(params)
      if (result instanceof Error) return conflict(result)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { AddUser, UserParams } from '@/domain/usecases/user/add-user'
import { badRequest, conflict, ok, serverError } from '../helpers/http'
import { Controller } from '../ports/controllers'
import { HttpResponse } from '../ports/http'
import { Validator } from '../ports/validator'

export interface AddUserResponse {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
}

export class AddUserController implements Controller {
  constructor(private readonly validator: Validator, private readonly addUser: AddUser) {}

  async handle(params: UserParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.addUser.add(params)
      if (result instanceof Error) return conflict(result)

      const { id, name, email } = result
      return ok<AddUserResponse>({
        user: { id, name, email },
        token: ''
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

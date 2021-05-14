import { DeleteUser } from '@/domain/user/delete-user'
import { UnauthorizedUserDeletionError } from '@/domain/user/errors/unauthorized-deletion'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { badRequest, conflict, noContent, serverError, unauthorized } from '../../helpers/http'
import { Controller } from '../../ports/controllers'
import { HttpResponse } from '../../ports/http'
import { Validator } from '../../ports/validator'

export interface DeleteUserParams {
  email: string
  userId: string
}

export class DeleteUserController implements Controller {
  constructor(private readonly validator: Validator, private readonly deleteUser: DeleteUser) {}

  async handle(params: DeleteUserParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.deleteUser.delete(params.email, params.userId)
      if (result instanceof UnregisteredEmailError) return conflict(result)
      else if (result instanceof UnauthorizedUserDeletionError) return unauthorized(result)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

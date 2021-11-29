import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { ForbiddenError } from '@/presentation/errors/forbidden'
import {
  badRequest,
  forbidden,
  noContent,
  notFound,
  serverError
} from '@/presentation/helpers/http'
import { DeleteAccount } from '../domain/usecases/delete-account'

export interface DeleteAccountControllerParams {
  id: string
  accountId: string
}

export class DeleteAccountController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly deleteAccount: DeleteAccount
  ) {}

  async handle(params: DeleteAccountControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const { id, accountId } = params
      if (id !== accountId) return forbidden(new ForbiddenError('Forbidden account deletion'))

      const result = await this.deleteAccount.delete(id)
      if (result.isLeft()) return notFound(result.value)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

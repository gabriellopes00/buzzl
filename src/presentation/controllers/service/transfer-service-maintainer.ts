import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { TransferServiceMaintainer } from '@/domain/service/transfer-maintainer'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface TransferMaintainerParams {
  apiKey: string
  userId: string
  newMaintainerEmail: string
}

export class TransferMaintainerController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly transferMaintainer: TransferServiceMaintainer
  ) {}

  public async handle(request: TransferMaintainerParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const { apiKey, newMaintainerEmail, userId } = request
      const result = await this.transferMaintainer.transfer(apiKey, userId, newMaintainerEmail)
      if (result instanceof UnregisteredEmailError) return conflict(result)
      else if (result instanceof UnregisteredApiKeyError) return conflict(result)
      else if (result instanceof UnauthorizedMaintainerError) return unauthorized(result)
      else return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

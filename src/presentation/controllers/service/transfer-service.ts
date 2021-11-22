import { InvalidServiceTransferError } from '@/domain/service/errors/invalid-transfer'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { TransferService } from '@/domain/service/transfer-service'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { badRequest, conflict, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface TransferServiceParams {
  apiKey: string
  userId: string
  newMaintainerEmail: string
}

export class TransferServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly transferMaintainer: TransferService
  ) {}

  public async handle(request: TransferServiceParams): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const { apiKey, newMaintainerEmail, userId } = request
      const result = await this.transferMaintainer.transfer(apiKey, userId, newMaintainerEmail)
      if (result instanceof UnregisteredEmailError) return conflict(result)
      else if (result instanceof UnregisteredApiKeyError) return conflict(result)
      else if (result instanceof InvalidServiceTransferError) return conflict(result)
      else if (result instanceof UnauthorizedMaintainerError) return unauthorized(result)
      else return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

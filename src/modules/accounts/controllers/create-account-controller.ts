import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, conflict, created, serverError } from '@/presentation/helpers/http'
import { Encrypter } from '@/usecases/ports/encrypter'
import { AccountData } from '../domain/entities/account'
import { CreateAccount } from '../domain/usecases/create-account'
import { ExistingEmailError } from '../domain/usecases/errors/existing-email'

export interface CreateAccountControllerParams extends AccountData {}

export class CreateAccountController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly createAccount: CreateAccount,
    private readonly encrypter: Encrypter
  ) {}

  async handle(params: CreateAccountControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.createAccount.create(params)
      if (result.isLeft()) {
        if (result.value instanceof ExistingEmailError) return conflict(result.value)
        else return badRequest(result.value)
      }

      const { id, name, email, createdAt } = result.value
      const token = await this.encrypter.encrypt({ id, name, email })

      return created({ account: { id, name, email, created_at: createdAt }, access_token: token })
    } catch (error) {
      return serverError(error)
    }
  }
}

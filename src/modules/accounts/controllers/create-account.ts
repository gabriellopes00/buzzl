import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Encrypter } from '@/usecases/ports/encrypter'
import { AccountData } from '../domain/entities/account'
import { CreateAccount } from '../domain/usecases/create-account'

export interface AddUserResponse {
  user: {
    id: string
    name: string
    email: string
  }
  accessToken: string
}
export interface CreateAccountControllerParams extends AccountData {}

export class CreateAccountController implements Controller {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly encrypter: Encrypter
  ) {}

  async handle(params: CreateAccountControllerParams): Promise<HttpResponse> {
    try {
      // const error = this.validator.validate(params)
      // if (error) return badRequest(error)

      const result = await this.createAccount.create(params)
      if (result.isLeft()) return badRequest(result.value)

      const { id, name, email, createdAt } = result.value
      const token = this.encrypter.encrypt({ id, name, email })

      return created({ account: { id, name, email, created_at: createdAt }, accessToken: token })
    } catch (error) {
      return serverError(error)
    }
  }
}

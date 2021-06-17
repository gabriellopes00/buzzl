import { AddUser, UserParams } from '@/domain/user/add-user'
import { ExistingEmailError } from '@/domain/user/errors/existing-email'
import { SignIn } from '@/domain/user/sign-in'
import { MailService } from '@/services/ports/mail-service'
import { badRequest, conflict, created, serverError } from '../../helpers/http'
import { Controller } from '../../ports/controllers'
import { HttpResponse } from '../../ports/http'
import { Validator } from '../../ports/validator'

export interface AddUserResponse {
  user: {
    id: string
    name: string
    email: string
  }
  accessToken: string
}

export class AddUserController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly addUser: AddUser,
    private readonly mailService: MailService,
    private readonly signIn: SignIn
  ) {}

  async handle(params: UserParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const result = await this.addUser.add(params)
      if (result instanceof ExistingEmailError) return conflict(result)

      const { id, name, email } = result
      const token = (await this.signIn.sign({ email, password: params.password })) as string

      await this.mailService.sendMail({ name, email })

      return created({ user: { id, name, email }, accessToken: token })
    } catch (error) {
      return serverError(error)
    }
  }
}

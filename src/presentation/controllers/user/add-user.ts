import nodemailer from 'nodemailer'
import logger from '@/app/config/logger'
import { AddUser, UserParams } from '@/domain/user/add-user'
import { ExistingEmailError } from '@/domain/user/errors/existing-email'
import { SignIn } from '@/domain/user/sign-in'
import { badRequest, conflict, created, serverError } from '../../helpers/http'
import { Controller } from '../../ports/controllers'
import { HttpResponse } from '../../ports/http'
import { Validator } from '../../ports/validator'

import Queue from 'bull'
export const MailQueue = new Queue('mailing', { redis: { host: 'localhost', port: 6379 } })

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

      await MailQueue.add({ user: { id, name, email } })

      return created({ user: { id, name, email }, accessToken: token })
    } catch (error) {
      return serverError(error)
    }
  }
}

MailQueue.process(async job => await sendMail(job.data.user.email))

async function sendMail(email) {
  const setup = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: { user: '56e52e9034025b', pass: '123e8d25d7e89b' }
  }

  logger.info('called')

  const mailOptions = {
    from: 'gabriel@mail.com',
    to: email,
    subject: 'Bull Queue',
    text: 'This email was sent by a background job built with bull'
  }
  const transporter = nodemailer.createTransport(setup)
  await transporter.sendMail(mailOptions)
}

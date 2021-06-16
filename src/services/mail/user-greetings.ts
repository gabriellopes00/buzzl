import { User } from '@/domain/user/user'
import { MailService } from '../ports/mail-service'
import { EmailProvider } from './ports/email-provider'

export class UserGreetingsMailService implements MailService {
  constructor(private readonly provider: EmailProvider) {}

  public async sendMail(user: User): Promise<void> {
    await this.provider.send(
      'feedbackio@mail.com',
      user.email,
      `Welcome to Feedback.io, ${user.name}.`,
      `Welcome to our platform ${user.name}, enjoy that 👋`,
      `<p>Welcome to our platform ${user.name}, enjoy that 👋</p>`
    )
  }
}

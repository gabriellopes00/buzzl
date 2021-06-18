import { MailService } from '../ports/mail-service'
import { MailQueue } from './ports/mail-queue'

export class UserGreetingsMailService implements MailService {
  constructor(private readonly queue: MailQueue) {}

  public async sendMail(user: { name: string; email: string }): Promise<void> {
    await this.queue.push({
      from: 'feedbackio@mail.com',
      to: user.email,
      subject: `Welcome to Feedback.io, ${user.name}.`,
      text: `Welcome to our platform ${user.name}, enjoy that 👋`,
      html: `<p>Welcome to our platform ${user.name}, enjoy that 👋</p>`
    })
  }
}

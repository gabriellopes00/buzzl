import Queue from 'bull'
import { MailService } from '../ports/mail-service'
import { EmailProvider, MailProviderProps } from './ports/email-provider'

export const MailQueue = new Queue<MailProviderProps>('mailing', {
  redis: { host: process.env.CACHE_DB_HOST, port: Number(process.env.CACHE_DB_PORT) }
})

export class UserGreetingsMailService implements MailService {
  constructor(private readonly provider: EmailProvider) {}

  public async sendMail(user: { name: string; email: string }): Promise<void> {
    await MailQueue.add({
      from: 'feedbackio@mail.com',
      to: user.email,
      subject: `Welcome to Feedback.io, ${user.name}.`,
      text: `Welcome to our platform ${user.name}, enjoy that 👋`,
      html: `<p>Welcome to our platform ${user.name}, enjoy that 👋</p>`
    })
  }

  public async handle(): Promise<void> {
    await MailQueue.process(async job => await this.provider.send(job.data))
  }
}

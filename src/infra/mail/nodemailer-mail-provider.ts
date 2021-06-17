import { EmailProvider, MailProviderProps } from '@/services/mail/ports/email-provider'
import { createTestAccount, createTransport, Transporter } from 'nodemailer'

export class NodemailerMailProvider implements EmailProvider {
  private client: Transporter

  constructor(
    private readonly credentials: {
      host: string
      port: number
      auth: { user: string; pass: string }
    }
  ) {
    createTestAccount().then(account => {
      this.client = createTransport({
        host: this.credentials.host,
        port: this.credentials.port,
        auth: this.credentials.auth
      })
    })
  }

  public async send(props: MailProviderProps): Promise<void> {
    await this.client.sendMail({
      from: props.from,
      to: props.to,
      subject: props.subject,
      text: props.subject,
      html: props.html
    })
  }
}

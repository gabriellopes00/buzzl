import { EmailProvider } from '@/usecases/ports/email-provider'
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

  public async send(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void> {
    await this.client.sendMail({ from, to, subject, text, html })
  }
}

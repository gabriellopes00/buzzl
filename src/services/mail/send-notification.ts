import { Service } from '@/domain/service/service'
import { MailService } from '../ports/mail-service'
import { EmailProvider } from './ports/email-provider'

export class Ser implements MailService {
  constructor(private readonly provider: EmailProvider) {}

  public async sendMail(data: Service, maintainerEmail: string): Promise<void> {
    await this.provider.send(
      'feedbackio@mail.com',
      maintainerEmail,
      `New service created for user ${maintainerEmail}`,
      `A new service was created linked with your account. Now ${data.name} is available to receive feedbacks from your customers by using the key ${data.apiKey} ! Enjoy the opportunity to contact and have a and have a closer communication with them. The feedbacks will be available in our platform: https://feedbackio.vercel.app`,
      `<p>A new service was created linked with your account. Now <strong>${data.name}</strong> is available to receive feedbacks from your customers by using the key <strong>${data.apiKey}</strong> ! Enjoy the opportunity to contact and have a and have a closer communication with them. The feedbacks will be available in our platform <a href="https://feedbackio.vercel.app"></a>`
    )
  }
}

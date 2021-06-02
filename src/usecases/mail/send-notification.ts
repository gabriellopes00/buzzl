import { CreateServiceNotification } from '@/domain/mail/create-service-notification'
import { Service } from '@/domain/service/service'
import { readFileSync } from 'fs'
import handlebars from 'handlebars'
import { resolve } from 'path'
import { EmailProvider } from '../ports/email-provider'

export class DbCreateServiceNotification implements CreateServiceNotification {
  constructor(private readonly provider: EmailProvider) {}

  public async send(data: Service, maintainerEmail: string): Promise<void> {
    const template = readFileSync(
      resolve(__dirname, 'templates', 'create-service-notification.hbs')
    ).toString('utf-8')
    const mailTemplateParse = handlebars.compile(template)
    const { name, apiKey } = data
    const html = mailTemplateParse({ maintainer: maintainerEmail, serviceName: name, apiKey })

    await this.provider.send(
      'feedbackio@mail.com',
      maintainerEmail,
      `New service created for user ${maintainerEmail}`,
      html
    )
  }
}

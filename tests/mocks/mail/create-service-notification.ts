import { CreateServiceNotification } from '@/domain/mail/create-service-notification'
import { Service } from '@/domain/service/service'
import { EmailProvider } from '@/usecases/ports/email-provider'

export class FakeMailProvider implements EmailProvider {
  public async send(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void> {}
}

export class MockServiceNotification implements CreateServiceNotification {
  public async send(data: Service, maintainerMail: string): Promise<void> {}
}

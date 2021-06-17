import { MailService } from '@/services/ports/mail-service'

export class MockMailService implements MailService {
  public async sendMail(data: any): Promise<void> {}
}

import { EmailProvider } from '@/usecases/ports/email-provider'

export class FakeMailProvider implements EmailProvider {
  public async send(from: string, to: string, subject: string, content: string): Promise<void> {}
}

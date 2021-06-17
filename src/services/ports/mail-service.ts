export interface MailService {
  sendMail(data: any): Promise<void>
}

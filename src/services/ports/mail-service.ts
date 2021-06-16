export interface MailService {
  sendMail(data: any, args?: any): Promise<void>
}

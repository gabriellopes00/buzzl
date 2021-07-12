export interface EmailSender<T = any> {
  sendMail(data: T): Promise<void>
}

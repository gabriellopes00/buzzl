export interface MailQueue {
  push(data: any): Promise<void>
}

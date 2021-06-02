export interface EmailProvider {
  send: (from: string, to: string, subject: string, text: string, html: string) => Promise<void>
}

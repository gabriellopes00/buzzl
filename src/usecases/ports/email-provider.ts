export interface EmailProvider {
  send: (from: string, to: string, subject: string, content: string) => Promise<void>
}

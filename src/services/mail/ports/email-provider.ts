export interface MailProviderProps {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

export interface EmailProvider {
  send: (props: MailProviderProps) => Promise<void>
}

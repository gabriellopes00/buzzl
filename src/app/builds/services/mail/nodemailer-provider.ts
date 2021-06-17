import { NodemailerMailProvider } from '@/infra/mail/nodemailer-mail-provider'

const { MAIL_PORT, MAIL_HOST, MAIL_USER, MAIL_PASS } = process.env

export const nodemailerMailProvider = new NodemailerMailProvider({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: { user: MAIL_USER, pass: MAIL_PASS }
})

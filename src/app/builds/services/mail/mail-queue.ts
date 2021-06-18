import { BullMailQueue } from '@/infra/mail/bull-mail-queue'
import { nodemailerMailProvider } from './nodemailer-provider'

export const bullMailQueue = new BullMailQueue(nodemailerMailProvider)
bullMailQueue.process()

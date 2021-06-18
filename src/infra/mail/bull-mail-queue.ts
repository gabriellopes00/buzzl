import { MailProvider, MailProviderProps } from '@/services/mail/ports/email-provider'
import { MailQueue } from '@/services/mail/ports/mail-queue'
import BullQueue, { Queue } from 'bull'

export class BullMailQueue implements MailQueue {
  private queue: Queue<MailProviderProps>
  constructor(private readonly mailProvider: MailProvider) {
    this.queue = new BullQueue('mailQueue', {
      redis: { host: process.env.CACHE_DB_HOST, port: Number(process.env.CACHE_DB_PORT) }
    })
  }

  public async push(data: any): Promise<any> {
    await this.queue.add(data)
  }

  public async process(): Promise<void> {
    await this.queue.process(async (job, done) => {
      try {
        await this.mailProvider.send(job.data)
        done()
      } catch (error) {
        done(error)
      }
    })
  }
}

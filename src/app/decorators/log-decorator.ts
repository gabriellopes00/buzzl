import { Controller } from '@/presentation/ports/controllers'
import { Middleware } from '@/presentation/ports/middleware'
import { appendFileSync } from 'fs'
import { resolve } from 'path'
import { HttpResponse } from '../../presentation/ports/http'

export class LogDecorator implements Controller, Middleware {
  constructor(private readonly handler: Controller | Middleware) {}

  public async handle(request: any): Promise<HttpResponse> {
    const response = await this.handler.handle(request)
    try {
      if (response.code === 500) this.logError(response.body)
      return response
    } catch (error) {
      return response
    }
  }

  private logError(error: Error): void {
    appendFileSync(
      resolve(__dirname, '..', '..', '..', 'etc', 'logs', 'internal-errors.log'),
      `[${new Date().toISOString()}] ${error.stack}\n\n`
    )
  }
}

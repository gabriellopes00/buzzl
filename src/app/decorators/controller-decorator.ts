import { Controller } from '@/presentation/ports/controllers'
import { appendFileSync } from 'fs'
import { resolve } from 'path'
import { HttpResponse } from '../../presentation/ports/http'

export class ControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  public async handle(request: any): Promise<HttpResponse> {
    const response = await this.controller.handle(request)
    try {
      if (response.code === 500) this.logError(response.body)
      return response
    } catch (error) {
      return response
    }
  }

  private logError(error: Error): void {
    appendFileSync(
      resolve(__dirname, '..', '..', '..', 'logs', 'error.log'),
      `\n[${new Date().toISOString()}] ${error.stack}\n`
    )
  }
}

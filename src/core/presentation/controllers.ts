import { HttpResponse } from './http'

export interface Controller {
  handle(data: any): Promise<HttpResponse>
}

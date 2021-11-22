import { HttpResponse } from './http'

export interface Middleware {
  handle(data: any): Promise<HttpResponse>
}

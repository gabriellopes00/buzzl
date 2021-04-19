import { HttpResponse } from '../ports/http'

export const badRequest = (error: Error): HttpResponse => ({
  code: 400,
  body: error
})

import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../ports/http'

export const badRequest = (error: Error): HttpResponse => ({
  code: 400,
  body: error
})

export const ok = <T = any>(data: T): HttpResponse => ({
  code: 200,
  body: data
})

export const conflict = (error: Error): HttpResponse => ({
  code: 409,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  code: 500,
  body: new ServerError(error.stack)
})

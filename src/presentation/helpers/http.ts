import { ServerError } from '../errors/server-error'
import { UnauthorizedError } from '../errors/unauthorized'
import { HttpResponse } from '../ports/http'

export const badRequest = (error: Error): HttpResponse => ({
  code: 400,
  body: error
})

export const ok = <T = any>(data: T): HttpResponse => ({
  code: 200,
  body: data
})

export const created = <T = any>(data: T): HttpResponse => ({
  code: 201,
  body: data
})

export const conflict = (error: Error): HttpResponse => ({
  code: 409,
  body: error
})

export const unauthorized = (message?: string): HttpResponse => ({
  code: 401,
  body: new UnauthorizedError(message)
})

export const serverError = (error: Error): HttpResponse => ({
  code: 500,
  body: new ServerError(error.stack)
})

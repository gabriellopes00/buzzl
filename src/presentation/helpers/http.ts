import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../ports/http'

export const ok = (data: any): HttpResponse => ({
  code: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  code: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  code: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  code: 400,
  body: error
})

export const conflict = (error: Error): HttpResponse => ({
  code: 409,
  body: error
})

export const unauthorized = (error: Error): HttpResponse => ({
  code: 401,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  code: 403,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  code: 500,
  body: new ServerError(error.stack)
})

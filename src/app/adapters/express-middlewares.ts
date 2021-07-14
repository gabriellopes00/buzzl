import { Middleware } from '@/presentation/ports/middleware'
import { Request, Response, NextFunction } from 'express'
import { Sentry } from '../config/sentry'

export const middlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const response = await middleware.handle({ accessToken: req.headers?.['access-token'] })
    if (response.code === 200) {
      Object.assign(req.headers, response.body) // assign middleware response with other headers
      next()
    } else {
      if (response.code === 500) {
        Sentry.captureException(response.error)
        Sentry.captureMessage(response.error.stack)
      }
      res.status(response.code).json({ error: response.body.message })
    }
  }
}

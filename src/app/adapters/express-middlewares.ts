import { Middleware } from '@/presentation/ports/middleware'
import { Request, Response, NextFunction } from 'express'

export const middlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = { accessToken: req.headers?.['access-token'], ...(req.headers || {}) }
    const response = await middleware.handle(request)
    if (response.code === 200) {
      Object.assign(req.headers, response.body)
      next()
    } else res.status(response.code).json({ error: response.body.message })
  }
}

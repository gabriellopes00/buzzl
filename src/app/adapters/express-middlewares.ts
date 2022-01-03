import { Middleware } from '@/core/presentation/middleware'
import { NextFunction, Request, Response } from 'express'
import logger from '../config/logger'

export const middlewareAdapter = (middlewares: Middleware[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const m of middlewares) {
      const response = await m.handle({
        accessToken: req.headers?.authorization?.split(' ')[1]
      })
      if (response.code === 200) {
        Object.assign(req.headers, response.body) // assign middleware response with other headers
        next()
      } else {
        if (response.code === 500) logger.error(response.error)
        res.status(response.code).json({ error: response.body.message })
      }
    }
  }
}

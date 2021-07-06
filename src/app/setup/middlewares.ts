import { json, NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

export const secureHeaders = helmet()

export const bodyParser = json()

export const rateLimiter = rateLimit({ windowMs: 60 * 1000, max: 40, headers: true })

const max = Number(process.env.MAX_SERVICE_REQUESTS)
export const serviceRateLimiter = rateLimit({ windowMs: 60 * 1000, max, headers: true })

export const contentType = (_: Request, res: Response, next: NextFunction) => {
  res.type('json')
  next()
}

export const cors = (_: Request, res: Response, next: NextFunction) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}

export const noCache = (_: Request, res: Response, next: NextFunction) => {
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('pragma', 'no-cache')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  next()
}

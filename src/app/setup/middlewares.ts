import { json, NextFunction, Request, Response } from 'express'
import expressPino from 'express-pino-logger'
import pinoLogger from '../config/logger'

export const bodyParser = json()

export const logger = expressPino({ logger: pinoLogger })

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

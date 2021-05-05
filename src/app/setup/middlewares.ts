import { NODE_ENV } from '@/config/env'
import logger from '@/config/logger'
import { Express, json, NextFunction, Request, Response } from 'express'
import expressPino from 'express-pino-logger'

const contentType = (_: Request, res: Response, next: NextFunction) => {
  res.type('json')
  next()
}

const cors = (_: Request, res: Response, next: NextFunction) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}

const noCache = (_: Request, res: Response, next: NextFunction) => {
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('pragma', 'no-cache')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  next()
}

export default (app: Express): void => {
  app.use(cors)
  app.use(json())
  app.use(noCache)
  app.use(contentType)
  NODE_ENV !== 'test' && app.use(expressPino({ logger }))
}

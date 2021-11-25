import { Controller } from '@/core/presentation/controllers'
import { Request, Response } from 'express'
import logger from '../config/logger'

export const routerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.handle({ ...req.body, ...req.headers, ...req.params })
    if (response.code >= 200 && response.code <= 299) res.status(response.code).json(response.body)
    else {
      if (response.code === 500) logger.error(response.error)
      res.status(response.code).json({ error: response.body.message })
    }
  }
}

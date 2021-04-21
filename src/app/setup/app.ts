import express, { Express, json, Router, Request, Response, NextFunction } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

class Application {
  constructor(private readonly app: Express = express()) {}

  public async build(): Promise<Express> {
    this.middlewares()
    await this.router()
    // await this.exceptRoute()

    return this.app
  }

  private async router(): Promise<void> {
    const router = Router()
    this.app.use('/', router)
    readdirSync(resolve(__dirname, '..', 'routes')).map(async file => {
      if (!file.endsWith('.map')) (await import(`../routes/${file}`)).default(router)
    })
  }

  // private async exceptRoute(): Promise<void> {
  //   this.app.use((req, res, next) => {
  //     res.status(404).json({ message: 'Sorry, route not found' })
  //     next()
  //   })
  // }

  private middlewares() {
    this.app.use(json()) // body-parser
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.set('access-control-allow-origin', '*')
      res.set('access-control-allow-methods', '*')
      res.set('access-control-allow-headers', '*')
      next()
    })
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.type('json')
      next()
    })
  }
}

const application = new Application()
export default application.build()

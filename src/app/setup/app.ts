import express, { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

class Application {
  constructor(private readonly app: Express = express()) {}

  public async build(): Promise<Express> {
    await this.exceptRoute()
    await this.router()

    return this.app
  }

  private async router(): Promise<void> {
    const router = Router()
    this.app.use('/', router)
    readdirSync(resolve(__dirname, '..', 'routes')).map(async file => {
      if (!file.includes('.test.') && !file.endsWith('.map')) {
        ;(await import(`../routes/${file}`)).default(router)
      }
    })
  }

  private async exceptRoute(): Promise<void> {
    this.app.use((req, res, next) => {
      res.status(404).json({ message: 'Sorry, route not found' })
    })
  }
}

const application = new Application()
export default await application.build()

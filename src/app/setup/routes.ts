import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join, resolve } from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use(router)
  readdirSync(resolve(__dirname, '..', 'routes')).map(async file => {
    if (!file.endsWith('.map')) {
      ;(await import(join(__dirname, '..', 'routes', file))).default(router)
    }
  })

  app.use((req, res, next) => res.status(404).json({ message: 'Endpoint not found.' }))
}

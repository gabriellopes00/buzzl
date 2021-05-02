import { Express } from 'express'
import userRoutes from '../routes/user'

export default (app: Express): void => {
  app.use(userRoutes)
  app.use((req, res, next) => res.status(404).json({ message: 'Endpoint not found.' }))
}

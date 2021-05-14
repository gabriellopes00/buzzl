import express from 'express'
import serviceRoutes from '../routes/service'
import userRoutes from '../routes/user'
import { bodyParser, contentType, cors, noCache, rateLimiter } from './middlewares'

const app = express()

app.use([bodyParser, contentType, noCache, cors, rateLimiter])
app.use([userRoutes, serviceRoutes])

export default app

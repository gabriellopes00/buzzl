import express from 'express'
import userRoutes from '../routes/user'
import { bodyParser, contentType, logger, noCache, cors } from './middlewares'

const app = express()

app.use([bodyParser, contentType, noCache, logger, cors])
app.use([userRoutes])

export default app

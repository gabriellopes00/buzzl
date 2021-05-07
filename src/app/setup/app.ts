import express from 'express'
import userRoutes from '../routes/user'
import { bodyParser, contentType, cors, logger, noCache } from './middlewares'

const app = express()

app.use([bodyParser, contentType, noCache, logger, cors])
app.use([userRoutes])

export default app

import express from 'express'
import serviceRoutes from '../routes/service'
import userRoutes from '../routes/user'
import feedbackRoutes from '../routes/feedback'
import { bodyParser, contentType, cors, noCache, rateLimiter, secureHeaders } from './middlewares'

const app = express()

app.use([secureHeaders, bodyParser, contentType, noCache, cors, rateLimiter])
app.use([userRoutes, serviceRoutes, feedbackRoutes])

export default app

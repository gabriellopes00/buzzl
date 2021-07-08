import express from 'express'
import feedbackRoutes from '../routes/feedback'
import evaluationRoutes from '../routes/evaluation'
import serviceRoutes from '../routes/service'
import userRoutes from '../routes/user'
import { bodyParser, contentType, cors, noCache, rateLimiter, secureHeaders } from './middlewares'
import { serve, setup } from 'swagger-ui-express'
import docs from '../docs'

const app = express()

app.use('/docs', serve, setup(docs))
app.use([secureHeaders, bodyParser, contentType, noCache, cors, rateLimiter])

app.use(userRoutes)
app.use('/service', serviceRoutes)
app.use('/feedback', feedbackRoutes)
app.use('/evaluation', evaluationRoutes)

export default app

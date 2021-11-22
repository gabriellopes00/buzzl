import express from 'express'
import { serve, setup } from 'swagger-ui-express'
import docs from '../docs'
import { AccountRoutes } from '../routes/account'
import { bodyParser, contentType, cors, noCache, rateLimiter, secureHeaders } from './middlewares'

const app = express()

app.use('/docs', serve, setup(docs))
app.use([secureHeaders, bodyParser, contentType, noCache, cors, rateLimiter])

app.use('/accounts', AccountRoutes)

export default app

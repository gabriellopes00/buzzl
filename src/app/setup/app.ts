import express from 'express'
import userRoutes from '../routes/user'
import serviceRoutes from '../routes/service'
import { bodyParser, contentType, cors, noCache, secureHeaders } from './middlewares'

const app = express()

app.use([secureHeaders, bodyParser, contentType, noCache, cors])
app.use([userRoutes, serviceRoutes])

export default app

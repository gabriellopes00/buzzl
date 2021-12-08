import express from 'express'
import { serve, setup } from 'swagger-ui-express'
import docs from '../docs'
import { AccountRoutes } from '../routes/account'
import { ServiceRoutes } from '../routes/service'
import { bodyParser, contentType, cors, noCache, rateLimiter, secureHeaders } from './middlewares'

const app = express()

// app.use(
//   session({
//     cookie: { secure: true, maxAge: 60000 },
//     secret: process.env.COOKIE_SECRET,
//     saveUninitialized: true,
//     resave: false
//   })
// )
// app.set('trust proxy', 1)
// app.use(passport.initialize())
// app.use(passport.session())
app.use('/docs', serve, setup(docs))
app.use([secureHeaders, bodyParser, contentType, noCache, cors, rateLimiter])

app.use('/accounts', AccountRoutes)
app.use('/services', ServiceRoutes)

export default app

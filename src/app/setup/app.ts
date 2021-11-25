// import { passport } from '@/infra/oauth/passport-google'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { serve, setup } from 'swagger-ui-express'
import docs from '../docs'
import { AccountRoutes } from '../routes/account'
import { bodyParser, contentType, cors, noCache, rateLimiter, secureHeaders } from './middlewares'

const app = express()

app.use(
  session({
    cookie: { secure: true, maxAge: 60000 },
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: false
  })
)
app.set('trust proxy', 1)
app.use(passport.initialize())
app.use(passport.session())
app.use('/docs', serve, setup(docs))
app.use([secureHeaders, bodyParser, contentType, noCache, cors, rateLimiter])

app.use('/accounts', AccountRoutes)

export default app

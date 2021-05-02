import express from 'express'
import Middlewares from './middlewares'
import Router from './routes'

const app = express()

;(() => {
  Middlewares(app)
  Router(app)
})()
export default app

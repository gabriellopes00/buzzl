import 'dotenv/config'
import 'module-alias/register'
import logger from '@/app/config/logger'
import { PgConnection } from '@/infra/database/pg-helper'
import app from './setup/app'
;(async () => {
  const { PORT } = process.env
  try {
    await PgConnection.getInstance().connect()
    logger.info('PostgreSQL connected successfully')

    const server = app.listen(PORT, () => {
      logger.info('Server started successfully')
    })

    /* eslint-disable*/
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    for (const signal of exitSignals) {
      process.on(signal, async () => {
        try {
          await PgConnection.getInstance().disconnect()
          server.close(err => err && logger.error(`Server stopped with error: ${err}`))
          logger.info('Server stopped successfully')
          process.exit(0)
        } catch (error) {
          logger.error(`App exited with error: ${error}`)
          process.exit(1)
        }
      })
    }
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
})()

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`App exiting due an unhandled promise: ${promise} and reason: ${reason}`)
  throw reason
})

process.on('uncaughtException', error => {
  logger.error(`App exiting due to an uncaught exception: ${error}`)
  process.exit(0)
})

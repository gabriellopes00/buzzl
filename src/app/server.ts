import 'module-alias/register'
import 'dotenv/config'

import pgConnectionHelper from '@/infra/database/pg-helper'
import logger from '@/app/config/logger'

//
;(async () => {
  const { PORT } = process.env
  try {
    await pgConnectionHelper.connect()
    logger.info('PostgreSQL connected successfully')

    const app = (await import('./setup/app')).default
    const server = app.listen(PORT, () => {
      logger.info('Server started successfully')
    })

    /* eslint-disable*/
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    for (const signal of exitSignals) {
      process.on(signal, async () => {
        try {
          await pgConnectionHelper.close()
          server.close()
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

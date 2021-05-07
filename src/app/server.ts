import 'module-alias/register'
import 'dotenv/config'

import logger from '@/app/config/logger'
import { PgConnection } from '../infra/database/helpers/pg-helper'

// export const {
//   PORT,
//   API_LOG_ERRORS,
//   API_LOG_REQUESTS,
//   DB_URL,
//   MAX_FEEDBACK_REQUESTS,
//   MAX_NPS_REQUESTS,
//   TOKEN_PRIVATE_KEY,
//   TOKEN_PUBLIC_KEY,
//   TOKEN_EXPIRATION,
//   NODE_ENV
// } = process.env

//
;(async () => {
  const { PORT } = process.env
  try {
    const pgHelper = new PgConnection()
    await pgHelper.connect()
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
          await pgHelper.close()
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

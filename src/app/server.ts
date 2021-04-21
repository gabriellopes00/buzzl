import 'module-alias/register'
import { PORT } from '@/config/env'
import logger from '@/config/logger'
import { PsqlConnection } from '../infra/database/helpers/psql-helper'
;(async () => {
  try {
    const psqlHelper = new PsqlConnection()
    await psqlHelper.connect()
    logger.info('PostgreSQL connected successfully')

    const app = await (await import('./setup/app')).default
    const server = app.listen(PORT, () => {
      logger.info(`Server running at port ${PORT}`)
    })

    /* eslint-disable*/
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    /* eslint-disable */
    for (const signal of exitSignals) {
      process.on(signal, async () => {
        try {
          await psqlHelper.close()
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

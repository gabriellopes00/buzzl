import { Connection, getConnection, createConnection } from 'typeorm'
import { ConnectionError } from './errors/connection-error'
import { DbConnection } from './ports/db-connection'

export class PgConnection implements DbConnection {
  async connect(): Promise<void> {
    try {
      await createConnection() // connection options in <root>/ormconfig.js
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }

  getConnection(): Connection {
    try {
      return getConnection()
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }

  async close(): Promise<void> {
    try {
      await this.getConnection().close()
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }
}

export const tableNames = { user: 'user' }

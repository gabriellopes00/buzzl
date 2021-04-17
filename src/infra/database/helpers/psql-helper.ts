import { Connection, getConnection, createConnection } from 'typeorm'
import { ConnectionError } from './errors/connection-error'
import { DbConnection } from './ports/db-connection'

export class PsqlConnection implements DbConnection {
  async connect(): Promise<void> {
    try {
      await createConnection() // connection options in ormconfig.js
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }

  getConn(): Connection {
    try {
      const connection = getConnection()
      return connection
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }

  async close(): Promise<void> {
    try {
      await this.getConn().close()
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }
}

export const tableNames = { user: 'user' }

import { Connection, createConnection } from 'typeorm'
import { ConnectionError } from './errors/connection-error'
import { DbConnection } from './ports/db-connection'

class PsqlConnection implements DbConnection {
  private connection: Connection = null
  async connect(): Promise<void> {
    try {
      this.connection = await createConnection() // connection options in ormconfig.js
    } catch (error) {
      this.connection = null
      throw new ConnectionError(error.message)
    }
  }

  async close(): Promise<void> {
    try {
      if (this.connection === null) return
      else {
        await this.connection.close()
        this.connection = null
      }
    } catch (error) {
      throw new ConnectionError(error.message)
    }
  }

  getConnection(): Connection {
    if (this.connection === null) throw new ConnectionError('No connections available')
    else return this.connection
  }
}

export default new PsqlConnection()

export const tableNames = { user: 'user' }

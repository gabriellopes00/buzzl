import { Connection, createConnection, getConnection } from 'typeorm'

class PgConnectionHelper {
  async connect(): Promise<void> {
    await createConnection() // connection options in <root>/ormconfig.js
  }

  getConnection(): Connection {
    return getConnection()
  }

  async close(): Promise<void> {
    await this.getConnection().close()
  }
}

export default new PgConnectionHelper()

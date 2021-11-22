import {
  Connection,
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository,
  ObjectType,
  Repository
} from 'typeorm'

export class ConnectionNotFoundError extends Error {
  constructor() {
    super('No pg connection was found')
    this.name = 'ConnectionNotFoundError'
  }
}

export class PgConnection {
  private static instance?: PgConnection
  private connection?: Connection

  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has('default')
      ? getConnection()
      : await createConnection()
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    await getConnection().close()
    this.connection = undefined
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    return getRepository(entity)
  }
}

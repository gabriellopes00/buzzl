import { PgConnection } from '@/infra/database/pg-helper'
import { resolve } from 'path'

import { IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    // entities: [resolve('../../src/infra/database/models/account.ts')],
    migrations: [__dirname + '../../src/infra/database/migrations/*.js'],
    entities: [__dirname + '../../src/infra/database/models/account.js']
  })
  await connection.synchronize()
  await PgConnection.getInstance().connect()
  return db
}

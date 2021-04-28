import { ConnectionError } from '@/infra/database/helpers/errors/connection-error'
import { PgConnection } from '@/infra/database/helpers/pg-helper'
import { resolve } from 'path'
import { createConnection } from 'typeorm'

describe('PostgreSQL Helper', () => {
  const sut = new PgConnection()

  it('Should open, get and close a connection successfully', async () => {
    // should throw with no connections
    expect(() => sut.getConnection()).toThrowError(ConnectionError)

    // connection error
    jest.spyOn(sut, 'connect').mockRejectedValueOnce(new Error())
    let error = sut.connect()
    await expect(error).rejects.toThrow()

    // connection success
    jest.spyOn(sut, 'connect').mockImplementationOnce(async () => {
      await createConnection({ type: 'sqlite', database: resolve(__dirname, 'fake_db.sqlite') })
    })
    await sut.connect()
    const connection = sut.getConnection()
    expect(connection.name).toEqual('default')

    // close success
    await sut.close()

    // close error
    jest.spyOn(sut, 'close').mockRejectedValueOnce(new Error())
    error = sut.close()
    await expect(error).rejects.toThrow(Error)
  })
})

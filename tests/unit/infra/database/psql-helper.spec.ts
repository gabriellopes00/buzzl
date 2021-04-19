import { ConnectionError } from '@/infra/database/helpers/errors/connection-error'
import { PsqlConnection } from '@/infra/database/helpers/psql-helper'

describe('PostgreSQL Helper', () => {
  const sut = new PsqlConnection()

  it('Should open, get and close a connection successfully', async () => {
    // should throw with no connections
    expect(() => sut.getConnection()).toThrowError(ConnectionError)

    // connection error
    jest.spyOn(sut, 'connect').mockRejectedValueOnce(new Error())
    let error = sut.connect()
    await expect(error).rejects.toThrow()

    // connection success
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

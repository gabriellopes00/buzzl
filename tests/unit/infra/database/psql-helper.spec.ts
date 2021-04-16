import { ConnectionError } from '@/infra/database/helpers/errors/connection-error'
import psqlConnection from '@/infra/database/helpers/psql-helper'

describe('PostgreSQL Helper', () => {
  const sut = psqlConnection

  it('Should open, get and close a connection successfully', async () => {
    // connection error
    jest.spyOn(sut, 'connect').mockRejectedValueOnce(new Error())
    let error = sut.connect()
    await expect(error).rejects.toThrow()

    // connection success
    await sut.connect()
    const connection = sut.getConnection()
    expect(connection.options.type).toEqual('postgres')

    // close success
    await sut.close()
    expect(() => sut.getConnection()).toThrow(ConnectionError)

    // close error
    jest.spyOn(sut, 'close').mockRejectedValueOnce(new Error())
    error = sut.close()
    await expect(error).rejects.toThrow(Error)
  })
})

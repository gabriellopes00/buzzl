import app from '@/app/setup/app'
import { AccountModel } from '@/infra/database/models/account'
import { PgConnection } from '@/infra/database/pg-helper'
import { makeFakeDb } from '@t/mocks/postgres'
import { IBackup } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'

describe('Create Accounts', () => {
  let backup: IBackup
  let connection: PgConnection
  let pgUserRepo: Repository<AccountModel>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([AccountModel])
    backup = db.backup()
    pgUserRepo = connection.getRepository(AccountModel)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
  })

  it('Should return 201 on success', async () => {
    const params = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_pass' }
    const { status, body } = await request(app).post('/accounts').send(params)

    expect(status).toBe(201)
    expect(body.access_token).toBe(expect.any(String))
    expect(body.account).toBe(expect.any(Object))
  })
})

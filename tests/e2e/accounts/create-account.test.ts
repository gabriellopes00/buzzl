import app from '@/app/setup/app'
import { AccountModel } from '@/infra/database/models/account'
import { PgConnection } from '@/infra/database/pg-helper'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'
import request from 'supertest'
import { getRepository } from 'typeorm'

describe('Create Accounts', () => {
  beforeAll(async () => await PgConnection.getInstance().connect())
  afterAll(async () => await PgConnection.getInstance().disconnect())
  beforeEach(async () => await getRepository(AccountModel).delete({}))

  const params = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_pass' }

  it('Should create an account on success', async () => {
    const { status, body } = await request(app).post('/accounts').send(params)

    expect(status).toBe(201)
    expect(body.access_token).toEqual(expect.any(String))
    expect(body.account).toEqual(expect.any(Object))

    const account = await getRepository(AccountModel).findOne({
      where: { email: 'johndoe@mail.com' }
    })

    expect(account.name).toBe(params.name)
    expect(account.id).toEqual(expect.any(String))
  })

  it('Should not create an account if email is already in use', async () => {
    const repo = getRepository(AccountModel)
    const uuid = new MockedUUIDGenerator().generate()
    await repo.save(repo.create({ id: uuid, ...params }))

    const _params = { ...params, name: 'John Doe 2' }
    console.log(_params)

    const { status, body } = await request(app).post('/accounts').send(_params)
    console.log(body)

    expect(status).toBe(409)
    expect(body.error).toEqual(expect.any(String))

    const exists = !!(await repo.findOne({ name: 'John Doe 2' }))
    expect(exists).toBeFalsy()
  })

  it('Should not create an account if receive any invalid param', async () => {
    const _params = { ...params, email: 'johndoe@mail' }
    const { status, body } = await request(app).post('/accounts').send(_params)

    expect(status).toBe(400)
    expect(body.error).toEqual(expect.any(String))

    const exists = !!(await getRepository(AccountModel).findOne({ email: 'johndoe@mail' }))
    expect(exists).toBeFalsy()
  })
})

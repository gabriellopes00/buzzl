import app from '@/app/setup/app'
import { AccountModel } from '@/infra/database/models/account'
import { ServiceModel } from '@/infra/database/models/service'
import { PgConnection } from '@/infra/database/pg-helper'
import request from 'supertest'
import { getRepository } from 'typeorm'

describe('Create Services', () => {
  let accessToken: string = null
  let accountId: string = null

  beforeAll(async () => {
    await PgConnection.getInstance().connect()
    await getRepository(AccountModel).delete({})
    const { body } = await request(app).post('/accounts').send(accountParams)
    accessToken = body.access_token
    accountId = body.account.id
  })
  afterAll(async () => await PgConnection.getInstance().disconnect())
  beforeEach(async () => await getRepository(ServiceModel).delete({}))

  const accountParams = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_123' }
  const params = { name: 'First Service', is_active: true, description: 'lorem ipsum' }

  it('Should create an service on success', async () => {
    const { status, body } = await request(app)
      .post('/services')
      .set({ Authorization: `bearer ${accessToken}` })
      .send(params)

    expect(status).toBe(201)
    expect(body.service).toEqual(expect.objectContaining({ ...params }))

    const account = await getRepository(ServiceModel).findOne({
      where: { maintainerAccountId: accountId }
    })

    expect(account.name).toBe(params.name)
    expect(account.id).toEqual(expect.any(String))
  })

  it('Should return unauthorized if request does not contain any auth token', async () => {
    const { status } = await request(app).post('/services').send(params)
    expect(status).toBe(401)
  })
})

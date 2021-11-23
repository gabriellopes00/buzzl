/**
 * @jest-environment ./tests/mocks/postgres-environment.js
 */
import app from '@/app/setup/app'
import { AccountModel } from '@/infra/database/models/account'
import { PgConnection } from '@/infra/database/pg-helper'
import request from 'supertest'
import { getRepository } from 'typeorm'

describe('Delete Account', () => {
  beforeAll(async () => await PgConnection.getInstance().connect())
  afterAll(async () => await PgConnection.getInstance().disconnect())
  beforeEach(async () => await getRepository(AccountModel).delete({}))

  it('Should delete an account on success', async () => {
    const params = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_pass' }
    const {
      body: {
        account: { id },
        access_token
      }
    } = await request(app).post('/accounts').send(params)

    const { status } = await request(app)
      .delete(`/accounts/${id}`)
      .set('access-token', access_token)

    expect(status).toBe(204)

    const account = await getRepository(AccountModel).findOne({
      where: { email: 'johndoe@mail.com' }
    })
    expect(account).toBe(undefined)
  })

  it('Should not delete an account if given id is not assigned to any account', async () => {
    const repo = getRepository(AccountModel)

    const params = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_pass' }
    const {
      body: { access_token }
    } = await request(app).post('/accounts').send(params)

    const { status, body } = await request(app)
      .delete('/accounts/invalid_uuid')
      .set('access-token', access_token)

    expect(status).toBe(403)
    expect(body.error).toEqual(expect.any(String))

    const exists = !!(await repo.findOne({ email: 'johndoe@mail.com' }))
    expect(exists).toBeTruthy()
  })
})

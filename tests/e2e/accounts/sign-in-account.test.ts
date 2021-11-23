/**
 * @jest-environment ./tests/mocks/postgres-environment.js
 */
import app from '@/app/setup/app'
import { AccountModel } from '@/infra/database/models/account'
import { PgConnection } from '@/infra/database/pg-helper'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'
import request from 'supertest'
import { getRepository } from 'typeorm'

describe('Sign In Account', () => {
  beforeAll(async () => await PgConnection.getInstance().connect())
  afterAll(async () => await PgConnection.getInstance().disconnect())
  beforeEach(async () => await getRepository(AccountModel).delete({}))

  const params = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_pass' }
  const createParams = { name: 'John Doe', email: 'johndoe@mail.com', password: 'secret_pass' }

  it('Should sign in an account on success', async () => {
    await request(app).post('/accounts').send(createParams)
    const { status, body } = await request(app).post('/accounts/sign-in').send(params)
    expect(status).toBe(200)
    expect(body.access_token).toEqual(expect.any(String))
    expect(body.refresh_token).toEqual(expect.any(String))
  })

  it('Should not sign in an account if email or password is invalid', async () => {
    const { status, body } = await request(app).post('/accounts/sign-in').send(params)
    expect(status).toBe(401)
  })
})

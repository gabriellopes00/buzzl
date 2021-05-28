import app from '@/app/setup/app'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { resolve } from 'path'
import supertest from 'supertest'
import { createConnection, getRepository } from 'typeorm'
import { fakeUserParams } from '@t/mocks/user/user'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'token'
  },

  async verify(): Promise<string> {
    return 'payload'
  }
}))

describe('Add User Route', () => {
  const request = supertest(app)

  beforeAll(async () => {
    jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
      await createConnection({
        type: 'sqlite',
        database: resolve(__dirname, '..', '..', 'mocks', 'fake_db.sqlite'),
        entities: [resolve(__dirname, '../../../src/infra/database/models/*.ts')]
      })
    })
    await pgConnectionHelper.connect()
  })
  afterAll(async () => await pgConnectionHelper.close())
  beforeEach(() => getRepository(UserModel).delete({}))

  it('Should create a user and return 201 on success', async () => {
    const response = await request.post('/signup').send(fakeUserParams)
    expect(response.status).toBe(201)
  })

  it('Should return 400 if receive an invalid request', async () => {
    await request.post('/signup').send({ name: 'User', email: 'user@mail.com' }).expect(400)
  })

  it('Should return 409 if receive an already registered email', async () => {
    await request.post('/signup').send(fakeUserParams)
    await request.post('/signup').send(fakeUserParams).expect(409)
  })
})

import app from '@/app/setup/app'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { resolve } from 'path'
import supertest from 'supertest'
import { createConnection, getRepository } from 'typeorm'
import { fakeSignInParams, fakeUserParams } from '@t/mocks/user/user'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'token'
  },

  async verify(): Promise<string> {
    return 'payload'
  }
}))

describe('Sign In Route', () => {
  const request = supertest(app)

  beforeAll(async () => {
    jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
      await createConnection({
        type: 'sqlite',
        database: resolve(__dirname, '..', 'mocks', 'fake_db.sqlite'),
        entities: [resolve(__dirname, '../../src/infra/database/models/*.ts')]
      })
    })
    await pgConnectionHelper.connect()
  })
  afterAll(async () => await pgConnectionHelper.close())
  beforeEach(() => getRepository(UserModel).delete({}))

  it('Should signin and return 200 on success', async () => {
    await request.post('/signup').send(fakeUserParams)
    await request.post('/signin').send(fakeSignInParams).expect(200)
  })

  it('Should return 400 if receive an invalid request', async () => {
    await request.post('/signin').send({ name: null, email: 'user@mail.com' }).expect(400)
    await request.post('/signin').send({ email: 'user@mail.com' }).expect(400)
    await request.post('/signin').send({}).expect(400)
  })

  it('Should return 400 if receive an unregistered email', async () => {
    await request.post('/signin').send(fakeSignInParams).expect(400)
  })

  it('Should return 400 if receive an unmatched password', async () => {
    await request.post('/signup').send(fakeUserParams)
    await request
      .post('/signin')
      .send({ ...fakeSignInParams, password: 'unmatched' })
      .expect(401)
  })
})

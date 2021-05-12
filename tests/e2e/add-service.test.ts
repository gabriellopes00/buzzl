import app from '@/app/setup/app'
import { ServiceModel } from '@/infra/database/models/service'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { resolve } from 'path'
import supertest from 'supertest'
import { createConnection, getRepository } from 'typeorm'
import { fakeServiceParams } from '../mocks/service'
import { fakeUser } from '../mocks/user'

jest.mock('jsonwebtoken', () => ({
  async verify(): Promise<Object> {
    return { id: fakeUser.id }
  }
}))

describe('Add Service Route', () => {
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
  beforeEach(() => getRepository(ServiceModel).delete({}))

  it('Should return 401 on missing access token', async () => {
    await request.post('/service').set('access-token', null).send(fakeServiceParams).expect(401)
  })

  it('Should return 403 on missing access token', async () => {
    await request.post('/service').send(fakeServiceParams).expect(403)
  })

  // it('Should create a service and return 201 on success', async () => {
  //   await getRepository(UserModel).save(fakeUser)
  //   await request.post('/service').set('access-token', 'token').send(fakeServiceParams).expect(201)
  // })

  it('Should return 400 if receive an invalid request', async () => {
    await request.post('/signup').send({ name: null }).expect(400)
    await request.post('/signup').send({}).expect(400)
  })
})

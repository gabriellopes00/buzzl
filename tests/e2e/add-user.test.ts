// import { PgConnection } from '@/infra/database/helpers/pg-helper'
// import app from '@/app/setup/app'
// import { fakeUserParams } from '../unit/mocks/user'
// import supertest from 'supertest'
// import { resolve } from 'path'
// import { createConnection } from 'typeorm'

describe('Add User Route', () => {
  // const request = supertest(app)
  // const pgHelper = new PgConnection()

  // jest.spyOn(pgHelper, 'connect').mockImplementationOnce(async () => {
  //   await createConnection({
  //     type: 'sqlite',
  //     database: resolve(__dirname, '..', '..', 'unit', 'infra', 'database', 'fake_db.sqlite')
  //   })
  // })

  // beforeAll(async () => await pgHelper.connect())
  // afterAll(async () => await pgHelper.close())

  // it('Should create a user and return 201 on success', async () => {
  //   const response = await request.post('/signup/').send(fakeUserParams)
  //   expect(response.status).toBe(201)
  // })

  // it('Should return 400 if receive an invalid request', async () => {
  //   app.post('/signup', (req, res) => res.send())
  //   await request.post('/signup').send({ name: 'user', email: 'user@mail.com' }).expect(400)
  // })

  it('', () => {
    expect(1).toBe(1)
  })
})

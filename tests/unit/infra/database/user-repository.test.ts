import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'
import { fakeUser } from '../../../mocks/user'

describe('Pg User Repository', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  const sut = new PgUserRepository()

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())
  beforeEach(() => getRepository(UserModel).delete({}))

  describe('Add User', () => {
    it('Should add a store a user data on success', async () => {
      const user = await sut.add(fakeUser)
      const data = await getRepository(UserModel).findOne({ id: fakeUser.id })
      expect(data.id).toEqual(user.id)
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())
      const error = sut.add(fakeUser)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Existing User', () => {
    it('Should return true if there is a user registered with received email', async () => {
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const existing = await sut.exists({ email: user.email })
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no user registered with received email', async () => {
      const existing = await sut.exists({ email: 'unregisred@mail.com' })
      expect(existing).toBeFalsy()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'exists').mockRejectedValueOnce(new Error())
      const error = sut.exists({ email: fakeUser.email })
      await expect(error).rejects.toThrow()
    })
  })

  describe('Find By Email', () => {
    it('Should return a user if it is found by email', async () => {
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const userFound = await sut.findBy({ email: user.email })
      expect(userFound.id).toEqual(user.id)
    })

    it('Should return null if no user is found', async () => {
      const userFound = await sut.findBy({ email: 'unregistered@mail.com' })
      expect(userFound).toBeNull()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'findBy').mockRejectedValueOnce(new Error())
      const error = sut.findBy({ email: fakeUser.email })
      await expect(error).rejects.toThrow()
    })
  })

  describe('Find By Id', () => {
    it('Should return a user if it is found by id', async () => {
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const userFound = await sut.findBy({ id: user.id })
      expect(userFound.id).toEqual(user.id)
    })

    it('Should return null if no user is found', async () => {
      const userFound = await sut.findBy({ id: 'invalid_id' })
      expect(userFound).toBeNull()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'findBy').mockRejectedValueOnce(new Error())
      const error = sut.findBy({ id: fakeUser.id })
      await expect(error).rejects.toThrow()
    })
  })
})

import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { resolve } from 'path'
import { createConnection, getCustomRepository } from 'typeorm'
import { fakeUser } from '../../../mocks/user'

describe('Pg User Repository', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())
  beforeEach(() => getCustomRepository(PgUserRepository).delete({}))

  describe('Add User', () => {
    it('Should add a store a user data on success', async () => {
      const sut = getCustomRepository(PgUserRepository)
      const user = await sut.add(fakeUser)

      const data = await sut.findOne({ id: fakeUser.id }) // native typeorm repository method
      expect(data.id).toEqual(user.id)
    })

    it('Should throw if typeorm repository throws', async () => {
      const sut = getCustomRepository(PgUserRepository)
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())

      const error = sut.add(fakeUser)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Existing User', () => {
    it('Should return true if there is a user registered with received email', async () => {
      const sut = getCustomRepository(PgUserRepository)
      const user = sut.create({ ...fakeUser })
      await sut.save(user) // native typeorm repository method

      const existing = await sut.exists(user.email)
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no user registered with received email', async () => {
      const sut = getCustomRepository(PgUserRepository)
      const existing = await sut.exists('unregisred@mail.com')
      expect(existing).toBeFalsy()
    })

    it('Should throw if typeorm repository throws', async () => {
      const sut = getCustomRepository(PgUserRepository)
      jest.spyOn(sut, 'exists').mockRejectedValueOnce(new Error())

      const error = sut.exists(fakeUser.email)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Find By Email', () => {
    it('Should return a user if it is found by email', async () => {
      const sut = getCustomRepository(PgUserRepository)
      const user = sut.create({ ...fakeUser })
      await sut.save(user)

      const userFound = await sut.findByEmail(user.email)
      expect(userFound.id).toEqual(user.id)
    })

    it('Should return null if no user is found', async () => {
      const sut = getCustomRepository(PgUserRepository)

      const userFound = await sut.findByEmail('unregistered@mail.com')
      expect(userFound).toBeNull()
    })

    it('Should throw if typeorm repository throws', async () => {
      const sut = getCustomRepository(PgUserRepository)
      jest.spyOn(sut, 'findByEmail').mockRejectedValueOnce(new Error())

      const error = sut.findByEmail(fakeUser.email)
      await expect(error).rejects.toThrow()
    })
  })
})

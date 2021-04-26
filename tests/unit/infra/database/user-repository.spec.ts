import { PsqlConnection } from '@/infra/database/helpers/psql-helper'
import { PsqlUserRepository } from '@/infra/database/repositories/user-repository'
import { resolve } from 'path'
import { createConnection, getCustomRepository } from 'typeorm'
import { fakeUser } from '../../mocks/user'

describe('User Repository', () => {
  const psqlHelper = new PsqlConnection()
  jest.spyOn(psqlHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  beforeAll(async () => await psqlHelper.connect())
  afterAll(async () => await psqlHelper.close())
  beforeEach(() => getCustomRepository(PsqlUserRepository).delete({}))

  describe('Add User', () => {
    it('Should add a store a user data on success', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      const user = await sut.add(fakeUser)

      const data = await sut.findOne({ id: fakeUser.id }) // native typeorm repository method
      expect(data.id).toEqual(user.id)
    })

    it('Should throw if typeorm repository throws', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())

      const error = sut.add(fakeUser)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Existing User', () => {
    it('Should return true if there is a user registered with received email', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      const user = sut.create({ ...fakeUser })
      await sut.save(user) // native typeorm repository method

      const existing = await sut.exists(user.email)
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no user registered with received email', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      const existing = await sut.exists('unregisred@mail.com')
      expect(existing).toBeFalsy()
    })

    it('Should throw if typeorm repository throws', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      jest.spyOn(sut, 'exists').mockRejectedValueOnce(new Error())

      const error = sut.exists(fakeUser.email)
      await expect(error).rejects.toThrow()
    })
  })
})

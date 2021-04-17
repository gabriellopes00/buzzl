import { PsqlConnection } from '@/infra/database/helpers/psql-helper'
import { PsqlUserRepository } from '@/infra/database/repositories/user-repository'
import { getCustomRepository } from 'typeorm'
import { fakeUser } from '../../../unit/mocks/user'

describe('User Repository', () => {
  const psqlHelper = new PsqlConnection()
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
  })

  describe('Existing User', () => {
    it('Should return true if there is a user registered with received email', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      const user = await sut.save(fakeUser) // native typeorm repository method

      const existing = await sut.exists(user.email)
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no user registered with received email', async () => {
      const sut = getCustomRepository(PsqlUserRepository)
      await sut.save(fakeUser) // native typeorm repository method

      const existing = await sut.exists('unregisred@mail.com')
      expect(existing).toBeFalsy()
    })
  })
})

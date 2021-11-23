import { AccountModel } from '@/infra/database/models/account'
import { PgConnection } from '@/infra/database/pg-helper'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { Account } from '@/modules/accounts/domain/entities/account'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'
import { getRepository } from 'typeorm'

describe('Pg Account Repository', () => {
  const sut = new PgAccountRepository()

  const uuid = new MockedUUIDGenerator().generate()
  const account = Account.create(
    {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'secret_pass'
    },
    uuid
  ).value as Account

  beforeAll(async () => await PgConnection.getInstance().connect())
  afterAll(async () => await PgConnection.getInstance().disconnect())
  beforeEach(async () => await getRepository(AccountModel).delete({}))

  describe('Create Account', () => {
    it('Should store an account in database on success', async () => {
      await sut.create(account)

      const data = await getRepository(AccountModel).findOne({ id: uuid })

      expect(data.name).toBe(account.name)
      expect(data.email).toBe(account.email)
    })
  })

  describe('Existing Account', () => {
    it('Should return true if there is an account registered with given email', async () => {
      const data = getRepository(AccountModel).create(account)
      await getRepository(AccountModel).save(data)

      const exists = await sut.existsEmail(account.email)
      expect(exists).toBeTruthy()
    })

    it('Should return false if there is no accounts registered with received email', async () => {
      const exists = await sut.existsEmail(account.email)
      expect(exists).toBeFalsy()
    })

    it('Should return true if there is an account registered with given id', async () => {
      const data = getRepository(AccountModel).create(account)
      await getRepository(AccountModel).save(data)

      const exists = await sut.existsId(account.id)
      expect(exists).toBeTruthy()
    })

    it('Should return false if there is no accounts registered with received email', async () => {
      const exists = await sut.existsId(account.id)
      expect(exists).toBeFalsy()
    })
  })

  describe('Find Account', () => {
    it('Should return account data if find one with given id', async () => {
      const data = getRepository(AccountModel).create(account)
      await getRepository(AccountModel).save(data)

      const found = await sut.findById(account.id)
      expect(found).toBeTruthy()
    })

    it('Should return null if does not find any account with given id', async () => {
      const found = await sut.findById(account.id)
      expect(found).toBeNull()
    })

    it('Should return account data if find one with given email', async () => {
      const data = getRepository(AccountModel).create(account)
      await getRepository(AccountModel).save(data)

      const found = await sut.findByEmail(account.email)
      expect(found).toBeTruthy()
    })

    it('Should return null if does not find any account with given email', async () => {
      const found = await sut.findByEmail(account.email)
      expect(found).toBeNull()
    })
  })

  describe('Delete Account', () => {
    it('Should delete an account froom database on success', async () => {
      const data = getRepository(AccountModel).create(account)
      await getRepository(AccountModel).save(data)

      await sut.delete(account.id)

      const result = await getRepository(AccountModel).findOne({ id: uuid })

      expect(result).toBe(undefined)
    })
  })
})

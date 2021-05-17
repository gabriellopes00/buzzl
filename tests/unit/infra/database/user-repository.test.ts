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

  describe('Add User', () => {
    it('Should add a store a user data on success', async () => {
      getRepository(UserModel).delete({})
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
      getRepository(UserModel).delete({})
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const existing = await sut.exists({ email: user.email })
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no user registered with received email', async () => {
      const existing = await sut.exists({ email: 'unregisred@mail.com' })
      expect(existing).toBeFalsy()
    })

    it('Should return true if there is a user registered with received id', async () => {
      getRepository(UserModel).delete({})
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const existing = await sut.exists({ id: user.id })
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no user registered with received id', async () => {
      const existing = await sut.exists({ id: 'unregisred@mail.com' })
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
      getRepository(UserModel).delete({})
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const userFound = await sut.findOne({ email: user.email })
      expect(userFound.id).toEqual(user.id)
    })

    it('Should return null if no user is found', async () => {
      const userFound = await sut.findOne({ email: 'unregistered@mail.com' })
      expect(userFound).toBeNull()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'findOne').mockRejectedValueOnce(new Error())
      const error = sut.findOne({ email: fakeUser.email })
      await expect(error).rejects.toThrow()
    })
  })

  describe('Find By Id', () => {
    it('Should return a user if it is found by id', async () => {
      getRepository(UserModel).delete({})
      const user = getRepository(UserModel).create({ ...fakeUser })
      await getRepository(UserModel).save(user)
      const userFound = await sut.findOne({ id: user.id })
      expect(userFound.id).toEqual(user.id)
    })

    it('Should return null if no user is found', async () => {
      const userFound = await sut.findOne({ id: 'invalid_id' })
      expect(userFound).toBeNull()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'findOne').mockRejectedValueOnce(new Error())
      const error = sut.findOne({ id: fakeUser.id })
      await expect(error).rejects.toThrow()
    })
  })

  describe('Delete User', () => {
    it('Should delete a user by email on success', async () => {
      getRepository(UserModel).delete({})
      const { email } = await getRepository(UserModel).save(fakeUser)
      await getRepository(UserModel).findOneOrFail({ email })

      await sut.delete({ email })
      await expect(getRepository(UserModel).findOneOrFail({ email })).rejects.toThrow()
    })

    it('Should delete a user by id on success', async () => {
      getRepository(UserModel).delete({})
      const { id } = await getRepository(UserModel).save(fakeUser)
      await getRepository(UserModel).findOneOrFail({ id })

      await sut.delete({ id })
      await expect(getRepository(UserModel).findOneOrFail({ id })).rejects.toThrow()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'delete').mockRejectedValueOnce(new Error())
      const error = sut.delete({ email: fakeUser.email })
      await expect(error).rejects.toThrow()
    })
  })
})

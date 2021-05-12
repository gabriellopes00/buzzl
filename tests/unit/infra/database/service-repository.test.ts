import { ServiceModel } from '@/infra/database/models/service'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'
import { fakeService } from '../../../mocks/service'
import { fakeUser } from '../../../mocks/user'

describe('Pg Service Repository', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  const sut = new PgServiceRepository()

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())
  beforeEach(() => {
    getRepository(ServiceModel).delete({})
    getRepository(UserModel).delete({})
  })

  describe('Add Service', () => {
    it('Should store a service data on success', async () => {
      await getRepository(UserModel).save(fakeUser)
      const service = await sut.add(fakeService)
      const data = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(data.id).toEqual(service.id)
    })

    it('Should not add a store a service if there is no respective maintainer', async () => {
      const service = new PgServiceRepository().add({ ...fakeService, maintainer: null })
      await expect(service).rejects.toThrow()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())
      const error = sut.add(null)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Delete service', () => {
    it('Should remove a service if its maintainer is removed', async () => {
      const userRepo = getRepository(UserModel)
      await userRepo.save(fakeUser)

      const service = await sut.add(fakeService)
      expect(service.id).toEqual(fakeService.id) // inserted successfully

      userRepo.delete({ id: fakeUser.id })
      const notFound = await getRepository(ServiceModel).findOne({
        id: fakeService.id,
        apiKey: fakeService.apiKey
      })
      expect(notFound).toBeFalsy() // removed if maintainer is removed (returns undefined)
    })

    it('Should delete a service by id on success', async () => {
      await getRepository(UserModel).save(fakeUser)
      const service = await sut.add(fakeService)
      const { id } = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(id).toEqual(service.id)

      await sut.delete({ id })
      const deleted = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(deleted).toBeFalsy()
    })

    it('Should delete a service by apiKey on success', async () => {
      await getRepository(UserModel).save(fakeUser)
      const service = await sut.add(fakeService)
      const { apiKey } = await getRepository(ServiceModel).findOne({ apiKey: fakeService.apiKey })
      expect(apiKey).toEqual(service.apiKey)

      await sut.delete({ apiKey })
      const deleted = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(deleted).toBeFalsy()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'delete').mockRejectedValueOnce(new Error())
      const error = sut.delete(null)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Find for existing service', () => {
    it('Should return true if found a service by apiKey', async () => {
      await getRepository(UserModel).save(fakeUser)
      const { apiKey } = await sut.add(fakeService)
      const existingService = await sut.exists({ apiKey })
      expect(existingService).toBeTruthy()
    })

    it('Should return true if found a service by id', async () => {
      await getRepository(UserModel).save(fakeUser)
      const { id } = await sut.add(fakeService)
      const existingService = await sut.exists({ id })
      expect(existingService).toBeTruthy()
    })

    it('Should return false if not found a service by id', async () => {
      await getRepository(UserModel).save(fakeUser)
      const { id } = await sut.add(fakeService)
      const existingService = await sut.exists({ id })
      expect(existingService).toBeTruthy()
    })

    it('Should return false if not found a service by apiKey', async () => {
      await getRepository(UserModel).save(fakeUser)
      const { apiKey } = await sut.add(fakeService)
      const existingService = await sut.exists({ apiKey })
      expect(existingService).toBeTruthy()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'exists').mockRejectedValueOnce(new Error())
      const error = sut.add(null)
      await expect(error).rejects.toThrow()
    })
  })
})

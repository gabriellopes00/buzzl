import { Service } from '@/domain/service/service'
import { ServiceModel } from '@/infra/database/models/service'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'

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
  afterEach(() => getRepository(ServiceModel).delete({}))

  describe('Add Service', () => {
    it('Should store a service data on success', async () => {
      getRepository(UserModel).delete({})
      await getRepository(UserModel).save(fakeUser)

      const service = await sut.add(fakeService)

      const { id } = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(id).toEqual(service.id)
    })

    it('Should not store a service if there is no respective maintainer', async () => {
      const service = sut.add({ ...fakeService, maintainer: null })
      await expect(service).rejects.toThrow()
    })
  })

  describe('Delete service', () => {
    it('Should delete a service by id on success', async () => {
      await getRepository(UserModel).save(fakeUser)
      let service = await getRepository(ServiceModel).save(fakeService)

      const { id } = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(id).toEqual(service.id)

      await sut.delete({ id })
      service = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(service).toBeFalsy()
    })

    it('Should delete a service by apiKey on success', async () => {
      await getRepository(UserModel).save(fakeUser)

      let service = await getRepository(ServiceModel).save(fakeService)
      const { apiKey } = await getRepository(ServiceModel).findOne({ apiKey: fakeService.apiKey })
      expect(apiKey).toEqual(service.apiKey)

      await sut.delete({ apiKey })

      service = await getRepository(ServiceModel).findOne({ id: fakeService.id })
      expect(service).toBeFalsy()
    })
  })

  describe('Find One service with maintainer data', () => {
    it('Should return the correct data if found a service by apiKey', async () => {
      const { email } = await getRepository(UserModel).save(fakeUser)
      const { apiKey } = await getRepository(ServiceModel).save(fakeService)

      const service = await sut.findOneJoinMaintainer({ apiKey })
      expect(service.apiKey).toEqual(apiKey)
      expect(service.maintainer.email).toEqual(email)
    })

    it('Should return the correct data if found a service by id', async () => {
      const { email } = await getRepository(UserModel).save(fakeUser)
      const { id } = await getRepository(ServiceModel).save(fakeService)

      const service = await sut.findOneJoinMaintainer({ id })
      expect(service.id).toEqual(id)
      expect(service.maintainer.email).toEqual(email)
    })

    it('Should return null if not found a service by id', async () => {
      await getRepository(UserModel).save(fakeUser)
      const existingService = await sut.findOneJoinMaintainer({ id: 'nonexisting_id' })
      expect(existingService).toBeNull()
    })

    it('Should return false if not found a service by apiKey', async () => {
      await getRepository(UserModel).save(fakeUser)
      const existingService = await sut.findOneJoinMaintainer({ apiKey: 'nonexisting_apiKey' })
      expect(existingService).toBeNull()
    })
  })

  describe('Update service', () => {
    const newData: Partial<Omit<Service, 'id' | 'apiKey' | 'maintainer'>> = {
      name: 'New Service',
      description: 'New Service Updated',
      isActive: false
    }
    const fakeData: Service = { ...fakeService, ...newData }

    it('Should update a service by id on success', async () => {
      await getRepository(UserModel).save(fakeUser)
      const service = await sut.add(fakeService)

      const { name } = await getRepository(ServiceModel).findOne({ id: service.id })
      expect(name).toEqual(service.name)

      await sut.update(fakeData)
      const newName = await (await getRepository(ServiceModel).findOne({ id: fakeService.id })).name
      expect(newName).toEqual(fakeData.name)
    })
  })

  describe('Find All services', () => {
    it('Should return all services found if does not receive any criteria', async () => {
      await getRepository(UserModel).save(fakeUser)
      const service = await getRepository(ServiceModel).save(fakeService)

      const services = await sut.findAll()
      expect(services).toEqual([service])
    })

    it('Should return null if does not found any service without any criteria', async () => {
      const services = await sut.findAll()
      expect(services).toBeNull()
    })

    it('Should return all services found if receive maintainer as criteria', async () => {
      await getRepository(UserModel).save(fakeUser)
      await sut.add(fakeService)

      const { id } = await getRepository(UserModel).save({
        ...fakeUser,
        email: 'another@mail.com',
        id: 'user_id'
      })
      const service = await getRepository(ServiceModel).save({
        ...fakeService,
        id: 'any_id',
        name: 'any_name',
        apiKey: '_cbvTX7PjT15T',
        maintainer: id
      })
      const services = await sut.findAll({ maintainer: id })
      expect(services).toEqual([service])
    })

    it('Should return null if does not found any service with maintainer as criteria', async () => {
      const services = await sut.findAll({ maintainer: fakeUser.id })
      expect(services).toBeNull()
    })
  })

  describe('Find One Service', () => {
    it('Should return the data if found a service by id', async () => {
      getRepository(ServiceModel).delete({})
      const service = getRepository(ServiceModel).create({ ...fakeService })
      await getRepository(ServiceModel).save(service)

      const existing = await sut.findOne({ id: service.id })
      expect(existing.name).toEqual(fakeService.name)
    })

    it('Should return null if there is no service with received id', async () => {
      const existing = await sut.findOne({ id: '179a0787-a48d-4251-81dc-c027ecd409d8' })
      expect(existing).toBeNull()
    })

    it('Should return the data if found a service with received api key', async () => {
      getRepository(ServiceModel).delete({})
      const service = getRepository(ServiceModel).create({ ...fakeService })
      await getRepository(ServiceModel).save(service)

      const existing = await sut.findOne({ apiKey: service.apiKey })
      expect(existing.name).toEqual(fakeService.name)
    })

    it('Should return null if there is no service with received api key', async () => {
      const existing = await sut.findOne({ apiKey: 'unregistered_key' })
      expect(existing).toBeNull()
    })
  })

  describe('Existing Service', () => {
    it('Should return true if found a service by id', async () => {
      getRepository(ServiceModel).delete({})
      const service = getRepository(ServiceModel).create({ ...fakeService })
      await getRepository(ServiceModel).save(service)

      const existing = await sut.exists({ id: service.id })
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no service with received id', async () => {
      const existing = await sut.exists({ id: '179a0787-a48d-4251-81dc-c027ecd409d8' })
      expect(existing).toBeFalsy()
    })

    it('Should return true if found a service with received api key', async () => {
      getRepository(ServiceModel).delete({})
      const service = getRepository(ServiceModel).create({ ...fakeService })
      await getRepository(ServiceModel).save(service)

      const existing = await sut.exists({ apiKey: service.apiKey })
      expect(existing).toBeTruthy()
    })

    it('Should return false if there is no service with received api key', async () => {
      const existing = await sut.findOne({ apiKey: 'unregistered_key' })
      expect(existing).toBeFalsy()
    })
  })
})

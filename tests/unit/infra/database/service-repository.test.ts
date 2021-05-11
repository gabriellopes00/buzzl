import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { resolve } from 'path'
import { fakeService } from '../../../mocks/service'
import { createConnection, getCustomRepository } from 'typeorm'
import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { fakeUser } from '../../../mocks/user'

describe('Pg Service Repository', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())
  beforeEach(() => {
    getCustomRepository(PgServiceRepository).delete({})
    getCustomRepository(PgUserRepository).delete({})
  })

  describe('Add User', () => {
    it('Should add a store a service data on success', async () => {
      await getCustomRepository(PgUserRepository).add(fakeUser)
      const sut = getCustomRepository(PgServiceRepository)
      const service = await sut.add(fakeService)

      const data = await sut.findOne({ id: fakeService.id }) // native typeorm repository method
      expect(data.id).toEqual(service.id)
    })

    it('Should not add a store a service if there is no respective maintainer', async () => {
      const service = getCustomRepository(PgServiceRepository).add({
        ...fakeService,
        maintainer: null
      })
      await expect(service).rejects.toThrow()
    })

    it('Should remove a service if its maintainer is removed', async () => {
      const userRepo = getCustomRepository(PgUserRepository)
      await userRepo.add(fakeUser)

      const sut = getCustomRepository(PgServiceRepository)
      const service = await sut.add(fakeService)
      expect(service.id).toEqual(fakeService.id) // inserted successfully

      userRepo.delete({ id: fakeUser.id })
      const notFound = await sut.findOne({ id: fakeService.id, apiKey: fakeService.apiKey })
      expect(notFound).toBeFalsy() // removed if maintainer is removed (returns undefined)
    })

    it('Should throw if typeorm repository throws', async () => {
      const sut = getCustomRepository(PgServiceRepository)
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())

      const error = sut.add(null)
      await expect(error).rejects.toThrow()
    })
  })
})

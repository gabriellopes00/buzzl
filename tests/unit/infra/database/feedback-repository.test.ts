import { FeedbackModel } from '@/infra/database/models/feedback'
import { ServiceModel } from '@/infra/database/models/service'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'

describe('Pg Feedback Repository', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  const sut = new PgFeedbackRepository()

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())
  afterEach(() => getRepository(FeedbackModel).delete({}))

  describe('Add Feedback', () => {
    it('Should store a feedback data on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      await sut.add(fakeFeedback)

      const data = await getRepository(FeedbackModel).findOne({ id: fakeFeedback.id })
      expect(data.id).toEqual(fakeFeedback.id)
    })

    it('Should not add a store a feedback if there is no respective service', async () => {
      const feedback = new PgFeedbackRepository().add({ ...fakeFeedback, service: null })
      await expect(feedback).rejects.toThrow()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())
      const error = sut.add(null)
      await expect(error).rejects.toThrow()
    })
  })

  describe('List Feedback', () => {
    it('Should return all feedbacks on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      await getRepository(ServiceModel).save({ ...fakeService, id: 'd', apiKey: 'custom_service' })
      await sut.add(fakeFeedback)
      await sut.add({ ...fakeFeedback, id: 'id', category: 'IDEA', service: 'custom_service' })

      const data = await sut.findAll()
      expect(data).toEqual([
        expect.objectContaining(fakeFeedback),
        expect.objectContaining({
          ...fakeFeedback,
          id: 'id',
          category: 'IDEA',
          service: 'custom_service'
        })
      ])
    })

    it('Should return null if there is no feedback to received service', async () => {
      getRepository(FeedbackModel).delete({})
      const data = await sut.findAll()
      expect(data).toBeNull()
    })

    it('Should return all feedbacks by service on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      await getRepository(ServiceModel).save({ ...fakeService, id: 'd', apiKey: 'custom_service' })
      await sut.add(fakeFeedback)
      await sut.add({ ...fakeFeedback, id: 'id', category: 'IDEA', service: 'custom_service' })

      const data = await sut.findAll({ service: 'custom_service' })
      expect(data).toEqual([
        expect.objectContaining({
          ...fakeFeedback,
          id: 'id',
          category: 'IDEA',
          service: 'custom_service'
        })
      ])
    })

    it('Should return null if there is no feedback to received service', async () => {
      getRepository(FeedbackModel).delete({})
      const data = await sut.findAll({ service: 'any_service' })
      expect(data).toBeNull()
    })
  })
})
